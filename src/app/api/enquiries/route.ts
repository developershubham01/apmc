import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const CATEGORIES = [
  "Business Enquiries",
  "Organization Enquiries",
  "General Enquiries",
] as const;

const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(200, "Email is too long"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s()]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().max(150, "Subject is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  category: z.enum(CATEGORIES).default("General Enquiries"),
});

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiter: max 5 submissions per IP per 10 minutes.
// Sufficient for a single-instance deployment; swap for Redis if scaled out.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateBuckets.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  if (hits.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateBuckets.set(ip, hits);
  return false;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many enquiries submitted. Please try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Please check the form fields";
      return NextResponse.json({ error: firstError }, { status: 422 });
    }

    const { name, email, phone, subject, message, category } = parsed.data;

    const enquiry = await db.enquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        category,
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json(
      {
        ok: true,
        id: enquiry.id,
        createdAt: enquiry.createdAt,
        message: "Enquiry received. We will get back to you shortly.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/enquiries] Failed to store enquiry:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [enquiries, total] = await Promise.all([
      db.enquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          subject: true,
          category: true,
          status: true,
          createdAt: true,
        },
      }),
      db.enquiry.count(),
    ]);

    return NextResponse.json({ ok: true, total, count: enquiries.length, enquiries });
  } catch (err) {
    console.error("[GET /api/enquiries] Failed to list enquiries:", err);
    return NextResponse.json(
      { error: "Failed to load enquiries" },
      { status: 500 }
    );
  }
}

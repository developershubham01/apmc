import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { bumpStat, getSiteStats, SITE_STATS } from "@/lib/site-stats";
import { pushNotification } from "@/lib/notify";

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
  // Note: the honeypot `website` field is intentionally NOT in this schema.
  // It is checked separately in POST before validation so bots receive a
  // fake-success response instead of a validation error.
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

/** Validate the admin key supplied via the `x-admin-key` header. */
function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY ?? "";
  if (!adminKey) return false;
  return req.headers.get("x-admin-key") === adminKey;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      await bumpStat(SITE_STATS.rateLimited);
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

    // Honeypot check BEFORE validation: if the hidden field was filled by a
    // bot, discard the submission silently but answer with fake success so
    // the bot believes it worked and does not retry with another payload.
    const honeypotValue =
      typeof (body as Record<string, unknown>)?.website === "string"
        ? ((body as Record<string, unknown>).website as string).trim()
        : "";
    if (honeypotValue.length > 0) {
      await bumpStat(SITE_STATS.honeypotBlocked);
      return NextResponse.json(
        {
          ok: true,
          id: `skip-${Date.now()}`,
          createdAt: new Date().toISOString(),
          message: "Enquiry received.",
        },
        { status: 201 }
      );
    }

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

    // Mail-outbox pattern: record an admin notification for the new enquiry
    // (stands in for an SMTP email alert until a provider is connected).
    await pushNotification({
      type: "enquiry",
      title: `New enquiry from ${name}`,
      body: subject
        ? `${subject} — ${message.slice(0, 120)}`
        : message.slice(0, 140),
      refId: enquiry.id,
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

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const [enquiries, total, newCount, inProgressCount, resolvedCount, security] =
      await Promise.all([
        db.enquiry.findMany({
          orderBy: { createdAt: "desc" },
          take: 200,
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
        db.enquiry.count({ where: { status: "new" } }),
        db.enquiry.count({ where: { status: "in-progress" } }),
        db.enquiry.count({ where: { status: "resolved" } }),
        getSiteStats([SITE_STATS.honeypotBlocked, SITE_STATS.rateLimited]),
      ]);

    return NextResponse.json({
      ok: true,
      total,
      count: enquiries.length,
      stats: {
        total,
        new: newCount,
        inProgress: inProgressCount,
        resolved: resolvedCount,
      },
      security: {
        honeypotBlocked: security[SITE_STATS.honeypotBlocked],
        rateLimited: security[SITE_STATS.rateLimited],
      },
      enquiries,
    });
  } catch (err) {
    console.error("[GET /api/enquiries] Failed to list enquiries:", err);
    return NextResponse.json(
      { error: "Failed to load enquiries" },
      { status: 500 }
    );
  }
}

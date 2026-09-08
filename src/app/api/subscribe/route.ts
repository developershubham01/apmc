import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { bumpStat, SITE_STATS } from "@/lib/site-stats";
import { pushNotification } from "@/lib/notify";

const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(200, "Email is too long")
    .transform((v) => v.toLowerCase()),
  source: z.string().trim().max(40).optional(),
  // Note: the honeypot `website` field is intentionally NOT in this schema.
  // It is checked separately in POST before validation so bots receive a
  // fake-success response instead of a validation error.
});

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiter: max 4 subscribe attempts per IP per
// 10 minutes. Sufficient for a single-instance deployment.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 4;
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
      await bumpStat(SITE_STATS.rateLimited);
      return NextResponse.json(
        { error: "Too many attempts. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Honeypot check BEFORE validation: bots that fill the hidden field get a
    // fake-success response and nothing is stored.
    const honeypotValue =
      typeof (body as Record<string, unknown>)?.website === "string"
        ? ((body as Record<string, unknown>).website as string).trim()
        : "";
    if (honeypotValue.length > 0) {
      await bumpStat(SITE_STATS.honeypotBlocked);
      return NextResponse.json(
        { ok: true, id: `skip-${Date.now()}`, message: "Subscribed." },
        { status: 201 }
      );
    }

    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Please check the form" },
        { status: 422 }
      );
    }

    const { email, source } = parsed.data;

    const existing = await db.subscriber.findUnique({ where: { email } });
    if (existing) {
      // Idempotent success: a duplicate signup is not an error worth a toast.
      return NextResponse.json(
        {
          ok: true,
          id: existing.id,
          message: "You are already on the list — thank you!",
        },
        { status: 200 }
      );
    }

    const subscriber = await db.subscriber.create({
      data: { email, source: source || "footer" },
      select: { id: true, createdAt: true },
    });

    await pushNotification({
      type: "subscriber",
      title: "New newsletter subscriber",
      body: `${email} joined the market-updates list.`,
      refId: subscriber.id,
    });

    return NextResponse.json(
      {
        ok: true,
        id: subscriber.id,
        createdAt: subscriber.createdAt,
        message: "Subscribed. Market updates are on their way to your inbox.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/subscribe] Failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

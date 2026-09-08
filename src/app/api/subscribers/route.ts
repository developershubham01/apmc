import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/** Validate the admin key supplied via the `x-admin-key` header. */
function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY ?? "";
  if (!adminKey) return false;
  return req.headers.get("x-admin-key") === adminKey;
}

// ---------------------------------------------------------------------------
// GET — subscriber list + count for the admin dashboard.
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const [subscribers, total] = await Promise.all([
      db.subscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
        select: { id: true, email: true, source: true, createdAt: true },
      }),
      db.subscriber.count(),
    ]);

    return NextResponse.json({
      ok: true,
      total,
      count: subscribers.length,
      subscribers,
    });
  } catch (err) {
    console.error("[GET /api/subscribers] Failed:", err);
    return NextResponse.json(
      { error: "Failed to load subscribers" },
      { status: 500 }
    );
  }
}

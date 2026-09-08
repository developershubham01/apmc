import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/** Validate the admin key supplied via the `x-admin-key` header. */
function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY ?? "";
  if (!adminKey) return false;
  return req.headers.get("x-admin-key") === adminKey;
}

// ---------------------------------------------------------------------------
// GET — list the latest notifications + unread count (admin only)
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const [notifications, unread, total] = await Promise.all([
      db.notification.findMany({
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      db.notification.count({ where: { isRead: false } }),
      db.notification.count(),
    ]);

    return NextResponse.json(
      { ok: true, unread, total, notifications },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[GET /api/notifications] Failed:", err);
    return NextResponse.json(
      { error: "Failed to load notifications" },
      { status: 500 }
    );
  }
}

const patchSchema = z.union([
  z.object({ action: z.literal("read-all") }),
  z.object({
    id: z.string().min(1),
    isRead: z.boolean(),
  }),
]);

// ---------------------------------------------------------------------------
// PATCH — mark one notification read/unread, or mark everything read
// ---------------------------------------------------------------------------
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const parsed = patchSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 422 });
    }

    if ("action" in parsed.data) {
      const res = await db.notification.updateMany({
        where: { isRead: false },
        data: { isRead: true },
      });
      return NextResponse.json({ ok: true, updated: res.count });
    }

    const notification = await db.notification.update({
      where: { id: parsed.data.id },
      data: { isRead: parsed.data.isRead },
      select: { id: true, isRead: true },
    });
    return NextResponse.json({ ok: true, notification });
  } catch (err) {
    if ((err as { code?: string }).code === "P2025") {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }
    console.error("[PATCH /api/notifications] Failed:", err);
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE — remove one notification (?id=) or clear all read ones (?scope=read)
// ---------------------------------------------------------------------------
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const id = req.nextUrl.searchParams.get("id");
    const scope = req.nextUrl.searchParams.get("scope");

    if (id) {
      await db.notification.delete({ where: { id } });
      return NextResponse.json({ ok: true });
    }

    if (scope === "read") {
      const res = await db.notification.deleteMany({ where: { isRead: true } });
      return NextResponse.json({ ok: true, deleted: res.count });
    }

    return NextResponse.json(
      { error: "Provide ?id=<notification id> or ?scope=read" },
      { status: 422 }
    );
  } catch (err) {
    if ((err as { code?: string }).code === "P2025") {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }
    console.error("[DELETE /api/notifications] Failed:", err);
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    );
  }
}

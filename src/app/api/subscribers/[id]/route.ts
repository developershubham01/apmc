import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

import { isAuthorized } from "@/lib/adminAuth";

// ---------------------------------------------------------------------------
// DELETE — remove a single subscriber by id.
// ---------------------------------------------------------------------------
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const existing = await db.subscriber.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    await db.subscriber.delete({ where: { id } });

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[DELETE /api/subscribers/[id]] Failed:", err);
    return NextResponse.json(
      { error: "Failed to remove the subscriber" },
      { status: 500 }
    );
  }
}

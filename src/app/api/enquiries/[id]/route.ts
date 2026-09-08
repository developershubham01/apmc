import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const STATUSES = ["new", "in-progress", "resolved"] as const;

const patchSchema = z.object({
  status: z.enum(STATUSES),
});

function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY ?? "";
  if (!adminKey) return false;
  return req.headers.get("x-admin-key") === adminKey;
}

type RouteContext = { params: Promise<{ id: string }> };

/** Fetch a single enquiry including the full message body (admin only). */
export async function GET(req: NextRequest, context: RouteContext) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  try {
    const enquiry = await db.enquiry.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        subject: true,
        message: true,
        category: true,
        status: true,
        createdAt: true,
      },
    });

    if (!enquiry) {
      return NextResponse.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, enquiry });
  } catch (err) {
    console.error(`[GET /api/enquiries/${id}] Failed:`, err);
    return NextResponse.json(
      { error: "Failed to load enquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Status must be one of: new, in-progress, resolved" },
      { status: 422 }
    );
  }

  try {
    const enquiry = await db.enquiry.update({
      where: { id },
      data: { status: parsed.data.status },
      select: { id: true, status: true },
    });

    return NextResponse.json({ ok: true, enquiry });
  } catch (err) {
    console.error(`[PATCH /api/enquiries/${id}] Failed:`, err);
    return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  try {
    await db.enquiry.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[DELETE /api/enquiries/${id}] Failed:`, err);
    return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
  }
}

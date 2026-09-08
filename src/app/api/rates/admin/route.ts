import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { rateGroups } from "@/data/rates";

/** Validate the admin key supplied via the `x-admin-key` header. */
function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY ?? "";
  if (!adminKey) return false;
  return req.headers.get("x-admin-key") === adminKey;
}

const TREND_VALUES = ["up", "down", "steady"] as const;

const rowUpdateSchema = z.object({
  id: z.string().min(1),
  min: z.number().int().min(0, "Min cannot be negative").max(1_000_000),
  max: z.number().int().min(0, "Max cannot be negative").max(1_000_000),
  modal: z.number().int().min(0, "Modal cannot be negative").max(1_000_000),
  trend: z.enum(TREND_VALUES),
});

const touchSchema = z.object({
  action: z.literal("touch"),
});

// ---------------------------------------------------------------------------
// GET — full row list (with ids) grouped by market, for the admin editor.
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const count = await db.marketRate.count();
    if (count === 0) {
      // Auto-seed from the bundled reference data on first access.
      const rows = rateGroups.flatMap((group) =>
        group.rows.map((row, index) => ({
          groupSlug: group.slug,
          commodity: row.commodity,
          variety: row.variety,
          unit: row.unit,
          min: row.min,
          max: row.max,
          modal: row.modal,
          trend: row.trend,
          sortOrder: index,
        }))
      );
      await db.marketRate.createMany({ data: rows });
    }

    const rows = await db.marketRate.findMany({
      orderBy: [{ groupSlug: "asc" }, { sortOrder: "asc" }],
    });

    const groups = rateGroups.map(({ slug, label, note }) => ({
      slug,
      label,
      note,
      rows: rows
        .filter((r) => r.groupSlug === slug)
        .map((r) => ({
          id: r.id,
          commodity: r.commodity,
          variety: r.variety,
          unit: r.unit,
          min: r.min,
          max: r.max,
          modal: r.modal,
          trend: r.trend as (typeof TREND_VALUES)[number],
          sortOrder: r.sortOrder,
          updatedAt: r.updatedAt,
        })),
    }));

    const latest = rows.reduce<string | null>(
      (acc, r) =>
        !acc || new Date(r.updatedAt) > new Date(acc) ? r.updatedAt.toISOString() : acc,
      null
    );

    return NextResponse.json(
      {
        ok: true,
        total: rows.length,
        updatedAt: latest,
        groups,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[GET /api/rates/admin] Failed:", err);
    return NextResponse.json(
      { error: "Failed to load market rates" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PATCH — update a single rate row (prices + trend).
// ---------------------------------------------------------------------------
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = rowUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid rate data" },
        { status: 422 }
      );
    }

    const { id, min, max, modal, trend } = parsed.data;

    if (min > max) {
      return NextResponse.json(
        { error: "Minimum price cannot be greater than the maximum price" },
        { status: 422 }
      );
    }
    if (modal < min || modal > max) {
      return NextResponse.json(
        { error: "Modal price must sit between the minimum and maximum" },
        { status: 422 }
      );
    }

    const existing = await db.marketRate.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Rate row not found" }, { status: 404 });
    }

    const updated = await db.marketRate.update({
      where: { id },
      data: { min, max, modal, trend },
    });

    return NextResponse.json({
      ok: true,
      row: {
        id: updated.id,
        commodity: updated.commodity,
        variety: updated.variety,
        unit: updated.unit,
        min: updated.min,
        max: updated.max,
        modal: updated.modal,
        trend: updated.trend,
        sortOrder: updated.sortOrder,
        updatedAt: updated.updatedAt,
      },
    });
  } catch (err) {
    console.error("[PATCH /api/rates/admin] Failed:", err);
    return NextResponse.json(
      { error: "Failed to update the rate row" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — bulk actions. Currently supports { action: "touch" } which bumps the
// updatedAt timestamp of every row (marks the whole board as refreshed).
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const parsed = touchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Unknown action. Supported actions: touch" },
        { status: 422 }
      );
    }

    const now = new Date();
    const result = await db.marketRate.updateMany({ data: { updatedAt: now } });

    return NextResponse.json({
      ok: true,
      touched: result.count,
      updatedAt: now.toISOString(),
    });
  } catch (err) {
    console.error("[POST /api/rates/admin] Failed:", err);
    return NextResponse.json(
      { error: "Failed to refresh timestamps" },
      { status: 500 }
    );
  }
}

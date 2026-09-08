import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateGroups } from "@/data/rates";

// Group metadata comes from the bundled reference data; row values come from
// the database (auto-seeded on first request). The bundled data acts as both
// the seed source and the canonical list of groups.
const groupMeta = rateGroups.map(({ slug, label, note }) => ({ slug, label, note }));

async function ensureSeeded(): Promise<void> {
  const count = await db.marketRate.count();
  if (count > 0) return;

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

export async function GET() {
  try {
    await ensureSeeded();

    const [rows, latest] = await Promise.all([
      db.marketRate.findMany({ orderBy: [{ groupSlug: "asc" }, { sortOrder: "asc" }] }),
      db.marketRate.findFirst({ orderBy: { updatedAt: "desc" }, select: { updatedAt: true } }),
    ]);

    const groups = groupMeta.map((meta) => ({
      slug: meta.slug,
      label: meta.label,
      note: meta.note,
      rows: rows
        .filter((r) => r.groupSlug === meta.slug)
        .map(({ commodity, variety, unit, min, max, modal, trend }) => ({
          commodity,
          variety,
          unit,
          min,
          max,
          modal,
          trend: trend as "up" | "down" | "steady",
        })),
    }));

    return NextResponse.json(
      {
        ok: true,
        source: "database",
        updatedAt: latest?.updatedAt ?? null,
        groups,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[GET /api/rates] Failed:", err);
    return NextResponse.json(
      { error: "Failed to load market rates" },
      { status: 500 }
    );
  }
}

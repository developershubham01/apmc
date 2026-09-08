import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateGroups } from "@/data/rates";

// Group metadata comes from the bundled reference data; row values come from
// the database (auto-seeded on first request). The bundled data acts as both
// the seed source and the canonical list of groups.
const groupMeta = rateGroups.map(({ slug, label, note }) => ({ slug, label, note }));

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiter for the public endpoint: max 60 requests
// per IP per minute. Protects the DB-backed read path from abusive polling.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 60;
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

export async function GET(req: NextRequest) {
  try {
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

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

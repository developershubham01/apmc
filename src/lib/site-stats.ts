import { db } from "@/lib/db";

/**
 * Security/telemetry counters stored in the SiteStat key/value table.
 * Failures are swallowed on purpose — telemetry must never break the
 * request that is being counted.
 */
export const SITE_STATS = {
  honeypotBlocked: "honeypot_blocked",
  rateLimited: "rate_limited",
} as const;

export async function bumpStat(key: string): Promise<void> {
  try {
    await db.siteStat.upsert({
      where: { key },
      update: { value: { increment: 1 } },
      create: { key, value: 1 },
    });
  } catch (err) {
    console.error(`[site-stats] Failed to bump "${key}":`, err);
  }
}

export async function getSiteStats(
  keys: readonly string[]
): Promise<Record<string, number>> {
  try {
    const rows = await db.siteStat.findMany({
      where: { key: { in: [...keys] } },
    });
    const map = new Map(rows.map((r) => [r.key, r.value]));
    return Object.fromEntries(keys.map((k) => [k, map.get(k) ?? 0]));
  } catch (err) {
    console.error("[site-stats] Failed to read stats:", err);
    return Object.fromEntries(keys.map((k) => [k, 0]));
  }
}

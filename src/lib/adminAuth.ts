import { NextRequest } from "next/server";

export const DEFAULT_ADMIN_KEY = "kirti-admin-2026";

export function getAdminKey(): string {
  const envKey = process.env.ADMIN_KEY?.trim();
  return envKey && envKey.length > 0 ? envKey : DEFAULT_ADMIN_KEY;
}

export function isAuthorized(req: NextRequest): boolean {
  const configuredKey = getAdminKey();
  const headerKey = req.headers.get("x-admin-key")?.trim();
  const authHeader = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();

  if (!headerKey && !authHeader) {
    return false;
  }

  return headerKey === configuredKey || authHeader === configuredKey;
}

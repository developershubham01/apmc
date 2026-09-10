import { NextRequest, NextResponse } from "next/server";
import { isAuthorized, getAdminKey } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  let providedKey = req.headers.get("x-admin-key")?.trim();

  if (!providedKey) {
    try {
      const body = await req.json();
      if (typeof body?.key === "string") {
        providedKey = body.key.trim();
      }
    } catch {
      // ignore
    }
  }

  const expectedKey = getAdminKey();

  if (isAuthorized(req) || (providedKey && providedKey === expectedKey)) {
    return NextResponse.json({
      ok: true,
      message: "Admin authentication verified successfully.",
    });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Incorrect admin key. Please check your credentials and try again.",
    },
    { status: 401 }
  );
}

export async function GET(req: NextRequest) {
  if (isAuthorized(req)) {
    return NextResponse.json({ ok: true, message: "Authorized." });
  }
  return NextResponse.json(
    { ok: false, error: "Unauthorized. A valid admin key is required." },
    { status: 401 }
  );
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { galleryItems as defaultGalleryItems } from "@/data/gallery";

function isAuthorized(req: NextRequest): boolean {
  const headerKey = req.headers.get("x-admin-key");
  const configuredKey = process.env.ADMIN_KEY;
  if (!configuredKey) return false;
  return headerKey === configuredKey;
}

const galleryItemSchema = z.object({
  src: z.string().trim().min(1, "Image URL or path is required"),
  alt: z.string().trim().min(2, "Alt text / title is required"),
  category: z.string().trim().default("KIRTI RANA"),
  caption: z.string().trim().optional().or(z.literal("")),
  span: z.enum(["normal", "wide", "tall"]).default("normal"),
  sortOrder: z.number().int().default(0),
});

export async function GET() {
  try {
    let items = await db.galleryItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    // Seed default items on first launch if empty
    if (items.length === 0 && defaultGalleryItems.length > 0) {
      const created = await Promise.all(
        defaultGalleryItems.map((item, idx) =>
          db.galleryItem.create({
            data: {
              src: item.src,
              alt: item.alt,
              category: item.category,
              caption: item.caption || null,
              span: item.span || "normal",
              sortOrder: idx,
            },
          })
        )
      );
      items = created;
    }

    return NextResponse.json({ ok: true, items });
  } catch (err) {
    console.error("[GET /api/gallery] Failed to fetch gallery items:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch gallery items", items: defaultGalleryItems },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const json = await req.json();
    const parsed = galleryItemSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { src, alt, category, caption, span, sortOrder } = parsed.data;

    const item = await db.galleryItem.create({
      data: {
        src,
        alt,
        category,
        caption: caption || null,
        span: span || "normal",
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/gallery] Failed to create gallery item:", err);
    return NextResponse.json(
      { error: "Failed to create gallery item." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const json = await req.json();
    const { id, ...data } = json;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Gallery item ID is required." },
        { status: 400 }
      );
    }

    const parsed = galleryItemSchema.partial().safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid update data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await db.galleryItem.update({
      where: { id },
      data: {
        ...(parsed.data.src && { src: parsed.data.src }),
        ...(parsed.data.alt && { alt: parsed.data.alt }),
        ...(parsed.data.category && { category: parsed.data.category }),
        ...(parsed.data.caption !== undefined && { caption: parsed.data.caption || null }),
        ...(parsed.data.span && { span: parsed.data.span }),
        ...(parsed.data.sortOrder !== undefined && { sortOrder: parsed.data.sortOrder }),
      },
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (err) {
    console.error("[PUT /api/gallery] Failed to update gallery item:", err);
    return NextResponse.json(
      { error: "Failed to update gallery item." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. A valid admin key is required." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Gallery item ID is required in query params (?id=...)" },
        { status: 400 }
      );
    }

    await db.galleryItem.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true, message: "Gallery item deleted." });
  } catch (err) {
    console.error("[DELETE /api/gallery] Failed to delete gallery item:", err);
    return NextResponse.json(
      { error: "Failed to delete gallery item." },
      { status: 500 }
    );
  }
}

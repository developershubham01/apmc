import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { mediaEntries as defaultMediaEntries } from "@/data/media";

function isAuthorized(req: NextRequest): boolean {
  const headerKey = req.headers.get("x-admin-key");
  const configuredKey = process.env.ADMIN_KEY;
  if (!configuredKey) return false;
  return headerKey === configuredKey;
}

const mediaItemSchema = z.object({
  slug: z.string().trim().min(2, "Slug is required"),
  category: z.enum(["news", "events", "social-activities"]).default("news"),
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  date: z.string().trim().min(2, "Date is required"),
  location: z.string().trim().optional().or(z.literal("")),
  image: z.string().trim().min(1, "Cover image is required"),
  imageAlt: z.string().trim().min(2, "Image alt text is required"),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters"),
  highlights: z.array(z.string()).default([]),
  content: z.string().trim().optional().or(z.literal("")),
  sourceUrl: z.string().trim().optional().or(z.literal("")),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let items = await db.mediaItem.findMany({
      where: {
        ...(category ? { category } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    // Seed default items on first launch if empty
    if (items.length === 0 && defaultMediaEntries.length > 0) {
      const created = await Promise.all(
        defaultMediaEntries.map((item, idx) =>
          db.mediaItem.create({
            data: {
              slug: item.id,
              category: item.category,
              title: item.title,
              date: item.date,
              location: item.location || null,
              image: item.image,
              imageAlt: item.imageAlt,
              summary: item.summary,
              highlights: JSON.stringify(item.highlights || []),
              isPublished: true,
              sortOrder: idx,
            },
          })
        )
      );
      items = created;
    }

    const formatted = items.map((item) => {
      let parsedHighlights: string[] = [];
      try {
        parsedHighlights = JSON.parse(item.highlights);
      } catch {
        parsedHighlights = [];
      }
      return {
        ...item,
        id: item.id,
        highlights: parsedHighlights,
      };
    });

    return NextResponse.json({ ok: true, items: formatted });
  } catch (err) {
    console.error("[GET /api/media] Failed to fetch media items:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch media items", items: defaultMediaEntries },
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
    const parsed = mediaItemSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check slug uniqueness
    const existing = await db.mediaItem.findUnique({
      where: { slug: data.slug },
    });

    const slug = existing ? `${data.slug}-${Date.now()}` : data.slug;

    const item = await db.mediaItem.create({
      data: {
        slug,
        category: data.category,
        title: data.title,
        date: data.date,
        location: data.location || null,
        image: data.image,
        imageAlt: data.imageAlt,
        summary: data.summary,
        highlights: JSON.stringify(data.highlights),
        content: data.content || null,
        sourceUrl: data.sourceUrl || null,
        isPublished: data.isPublished,
        sortOrder: data.sortOrder || 0,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        item: {
          ...item,
          highlights: JSON.parse(item.highlights),
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/media] Failed to create media item:", err);
    return NextResponse.json(
      { error: "Failed to create media article." },
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
        { error: "Media item ID is required." },
        { status: 400 }
      );
    }

    const parsed = mediaItemSchema.partial().safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid update data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (parsed.data.slug) updateData.slug = parsed.data.slug;
    if (parsed.data.category) updateData.category = parsed.data.category;
    if (parsed.data.title) updateData.title = parsed.data.title;
    if (parsed.data.date) updateData.date = parsed.data.date;
    if (parsed.data.location !== undefined) updateData.location = parsed.data.location || null;
    if (parsed.data.image) updateData.image = parsed.data.image;
    if (parsed.data.imageAlt) updateData.imageAlt = parsed.data.imageAlt;
    if (parsed.data.summary) updateData.summary = parsed.data.summary;
    if (parsed.data.highlights) updateData.highlights = JSON.stringify(parsed.data.highlights);
    if (parsed.data.content !== undefined) updateData.content = parsed.data.content || null;
    if (parsed.data.sourceUrl !== undefined) updateData.sourceUrl = parsed.data.sourceUrl || null;
    if (parsed.data.isPublished !== undefined) updateData.isPublished = parsed.data.isPublished;
    if (parsed.data.sortOrder !== undefined) updateData.sortOrder = parsed.data.sortOrder;

    const updated = await db.mediaItem.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      ok: true,
      item: {
        ...updated,
        highlights: JSON.parse(updated.highlights || "[]"),
      },
    });
  } catch (err) {
    console.error("[PUT /api/media] Failed to update media item:", err);
    return NextResponse.json(
      { error: "Failed to update media article." },
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
        { error: "Media item ID is required (?id=...)" },
        { status: 400 }
      );
    }

    await db.mediaItem.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true, message: "Media article deleted." });
  } catch (err) {
    console.error("[DELETE /api/media] Failed to delete media item:", err);
    return NextResponse.json(
      { error: "Failed to delete media article." },
      { status: 500 }
    );
  }
}

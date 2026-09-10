import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { boardMembers as defaultBoardMembers, determineBoardCategory } from "@/data/boardMembers";
import { isAuthorized } from "@/lib/adminAuth";

const boardMemberSchema = z.object({
  name: z.string().trim().min(2, "Member name is required"),
  designation: z.string().trim().min(2, "Designation is required"),
  category: z.enum(["chairman", "office-bearer", "director"]).optional(),
  image: z.string().trim().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export async function GET() {
  try {
    let members = await db.boardMember.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    // Seed default board members on initial run if DB table is empty
    if (members.length === 0 && defaultBoardMembers.length > 0) {
      const seeded = await Promise.all(
        defaultBoardMembers.map((m, idx) =>
          db.boardMember.create({
            data: {
              name: m.name,
              designation: m.designation,
              category: m.category || determineBoardCategory(m.designation),
              image: m.image || null,
              sortOrder: m.sortOrder ?? idx,
            },
          })
        )
      );
      members = seeded;
    }

    return NextResponse.json({ ok: true, members });
  } catch (err) {
    console.error("[GET /api/board] Failed to fetch board members:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch board members", members: defaultBoardMembers },
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
    const parsed = boardMemberSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, designation, image, sortOrder } = parsed.data;
    const category = parsed.data.category || determineBoardCategory(designation);

    const member = await db.boardMember.create({
      data: {
        name,
        designation,
        category,
        image: image || null,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json({ ok: true, member }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/board] Failed to create board member:", err);
    return NextResponse.json(
      { error: "Failed to create board member." },
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
    const { id, name, designation, category, image, sortOrder } = json;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Member ID is required for update." },
        { status: 400 }
      );
    }

    const updated = await db.boardMember.update({
      where: { id },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        designation: designation !== undefined ? designation.trim() : undefined,
        category: category || (designation ? determineBoardCategory(designation) : undefined),
        image: image !== undefined ? (image ? image.trim() : null) : undefined,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : undefined,
      },
    });

    return NextResponse.json({ ok: true, member: updated });
  } catch (err) {
    console.error("[PUT /api/board] Failed to update board member:", err);
    return NextResponse.json(
      { error: "Failed to update board member." },
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
        { error: "Member ID is required for deletion." },
        { status: 400 }
      );
    }

    await db.boardMember.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true, deletedId: id });
  } catch (err) {
    console.error("[DELETE /api/board] Failed to delete board member:", err);
    return NextResponse.json(
      { error: "Failed to delete board member." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing `userId` query parameter" },
        { status: 400 }
      );
    }

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, bookmarks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch the bookmarks",
        error: error?.message ?? error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { userId, itemId, title, repository, description, stars, url } = payload;

    // Validate required fields
    if (!userId || itemId === undefined || itemId === null) {
      return NextResponse.json(
        {
          success: false,
          message: "`userId` and `itemId` are required in the body",
        },
        { status: 400 }
      );
    }

    const itemIdStr = String(itemId);

    // ✅ Check if bookmark exists using compound unique
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_itemId: {
          userId,
          itemId: itemIdStr,
        },
      },
    });

    if (existingBookmark) {
      // ❌ Remove existing bookmark
      await prisma.bookmark.delete({
        where: {
          userId_itemId: {
            userId,
            itemId: itemIdStr,
          },
        },
      });

      return NextResponse.json(
        {
          success: true,
          action: "removed",
          itemId: itemIdStr,
          message: "Bookmark removed",
        },
        { status: 200 }
      );
    }

    // ✅ Create a new bookmark
    const created = await prisma.bookmark.create({
      data: {
        userId,
        itemId: itemIdStr,
        title: title ?? null,
        repository: repository ?? "",
        description: description ?? "",
        stars: Number(stars) || 0,
        url: url ?? "",
        isBookmarked: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        action: "added",
        bookmark: created,
        message: "Bookmarked successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in bookmark POST:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to bookmark",
        error: error?.message ?? error,
      },
      { status: 500 }
    );
  }
}

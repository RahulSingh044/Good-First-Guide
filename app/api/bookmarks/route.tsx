import { connectDb } from "@/lib/db";
import bookmarked from "@/models/bookmarked";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing `userId` query parameter" },
        { status: 400 }
      );
    }

    const bookmarks = await bookmarked.find({ userId }).lean();
    return NextResponse.json({ success: true, bookmarks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Unable to fetch the Bookmarked List", error: error?.message ?? error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDb();
    const payload = await req.json();

    const userId = payload.userId;
    const itemId = payload.itemId;

    if (!userId || itemId === undefined || itemId === null) {
      return NextResponse.json(
        { success: false, message: "`userId` and `itemId` are required in the body" },
        { status: 400 }
      );
    }

    const itemIdStr = String(itemId);
    const exists = await bookmarked.findOne({ userId, itemId: itemIdStr });

    if (exists) {
      await bookmarked.deleteOne({ userId, itemId: itemIdStr });
      return NextResponse.json(
        { success: true, action: "removed", itemId: itemIdStr, message: "Bookmark removed" },
        { status: 200 }
      );
    }

    const { title, repository, description, stars, url } = payload;

    const created = await bookmarked.create({
      userId,
      itemId: itemIdStr,
      title,
      repository,
      description,
      stars,
      url,
      isBookmarked: true,
    });

    return NextResponse.json(
      { success: true, action: "added", bookmark: created, message: "Bookmarked Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Unable to Bookmark", error: error?.message ?? error },
      { status: 500 }
    );
  }
}
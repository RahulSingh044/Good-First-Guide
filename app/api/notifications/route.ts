import { NextResponse } from "next/server";
import Notification from "@/models/Notifications";
import { connectDb } from "@/lib/db";

export async function GET(req: Request) {
    await connectDb();

    try {
        const userId = new URL(req.url).searchParams.get("userId");
        if (!userId) return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 });
        const items = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(100);
        return NextResponse.json({ success: true, notifications: items });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

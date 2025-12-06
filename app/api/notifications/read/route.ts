import { NextResponse } from "next/server";
import Notification from "@/models/Notifications";
import { connectDb } from "@/lib/db";

export async function POST(req: Request) {
    await connectDb();

    try {
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ success: false, error: "User Not Logged In" }, { status: 400 });

        await Notification.updateMany({userId, read: false}, { read: true, readAt: new Date() });
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
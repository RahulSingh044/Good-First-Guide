import { NextResponse } from "next/server";
import {sendNotification} from "@/lib/Notification"
import { connectDb } from "@/lib/db";

export async function GET() {
  await connectDb();
  const res = NextResponse;

  const testUserId = "JEWVXXectzZAttaevyT0GzeMOi23"; // your user _id in DB

  await sendNotification(
    testUserId,
    {
      type: "TEST",
      message: "This is a test notification sent manually 🎉",
    },
  );

  return NextResponse.json({ success: true, message: "Notification sent" });
}

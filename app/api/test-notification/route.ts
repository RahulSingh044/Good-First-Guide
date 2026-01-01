import { sendNotification } from "@/lib/Notification";
import { NextResponse } from "next/server";

export async function GET() {
  const testUserId = "JEWVXXectzZAttaevyT0GzeMOi23"; // your user _id in DB

  await sendNotification(
    testUserId,
    {
      type: "Introduction",
      message: "Hey! Rahul, Welcome to our app! We're excited to have you on board.",
    },
  );

  return NextResponse.json({ success: true, message: "Notification sent" });
}

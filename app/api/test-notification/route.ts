import { NextResponse } from "next/server";
import {sendNotification} from "@/lib/Notification"
import { connectDb } from "@/lib/db";

export async function GET() {
  await connectDb();
  const res = NextResponse;

  const testUserId = "srF4BrKEcWNc2dNVgQxrgdcReeq1"; // your user _id in DB

  await sendNotification(
    testUserId,
    {
      type: "Introduction",
      message: "Hey! Vikas, Welcome to our app! We're excited to have you on board.",
    },
  );

  return NextResponse.json({ success: true, message: "Notification sent" });
}

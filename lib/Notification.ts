import prisma from "@/lib/prisma";
import { getIO } from "@/socket/server";

export async function sendNotification(userId: string, payLoad: any) {

  const notification = await prisma.notification.create({
    data: {
      userId,
      type: payLoad.type,
      message: payLoad.message,
      meta: payLoad.meta ?? {},
    },
  });

  try {
    const io = getIO(); 
    io.to(userId).emit("notification", notification);
  } catch (error: any) {
    console.warn(
      "⚠ Socket not initialized; notification saved but not sent.",
      error.message
    );
  }

  return notification;
}

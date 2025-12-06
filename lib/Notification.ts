import Notifications from "@/models/Notifications";
import { getIO, initializeSocket } from "@/socket/server";

export async function sendNotification(userId: string, payLoad: any) {

  await Notifications.create({
    userId,
    type: payLoad.type,
    message: payLoad.message,
    meta: payLoad.meta || {}
  });

  try {
    const io = getIO(); // MUST be initialized once globally
    io.to(userId).emit("notification", payLoad);
  } catch (error: any) {
    console.warn("⚠ Socket not initialized; notification saved but not sent.", error.message);
  }
}

import prisma from "@/lib/prisma";
import { getIO } from "@/socket/server";

export async function POST(req: Request) {
  const { userId, repo, title } = await req.json();

  const notification = await prisma.notification.create({
    data: {
      userId,
      type: "ISSUE_CLONED",
      message: `Issue "${title}" cloned from ${repo}`,
      read: false,
    },
  });

  try {
    const io = getIO();
    io.to(userId).emit("notification", notification);
  } catch {
    console.warn("Socket not ready");
  }

  return Response.json(notification);
}

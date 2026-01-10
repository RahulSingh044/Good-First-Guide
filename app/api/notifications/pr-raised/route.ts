import prisma from "@/lib/prisma";
import { getIO } from "@/socket/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId, repo, title } = await req.json();

    const notification = await prisma.notification.create({
        data: {
            userId,
            type: "PR_RAISED",
            message: `PR "${title}" raised from ${repo}`,
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
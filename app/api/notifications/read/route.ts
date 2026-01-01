import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "userId is required" }),
      { status: 400 }
    );
  }

  const result = await prisma.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
      readAt: new Date(),
    },
  });

  return Response.json({
    success: true,
    updated: result.count,
  });
}

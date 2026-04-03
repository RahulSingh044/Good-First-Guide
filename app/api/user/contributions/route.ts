import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const contributions = await prisma.issue.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(
      { success: true, data: contributions },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unable to fetch Contributions", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch Contributions" },
      { status: 500 },
    );
  }
};

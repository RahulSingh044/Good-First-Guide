import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const {
      userId,
      githubUserName,
      issueNumber,
      issueTitle,
    } = body;


    if (!userId || !githubUserName || !issueNumber || !issueTitle) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 📝 Create Issue
    const issue = await prisma.issue.create({
      data: {
        userId,
        githubUserName,
        issueNumber,
        issueTitle, 
        status: "STARTED",
      },
    });

    return NextResponse.json(
      { success: true, data: issue },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unable to save Issue", error);

    return NextResponse.json(
      { success: false, message: "Unable to Save the Issue" },
      { status: 500 }
    );
  }
};

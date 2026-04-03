import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const {
      userId,
      githubUsername,
      issueNumber,
      issueTitle,
      repo,
    } = body;

    console.log(body);

    if (!userId || !githubUsername || !issueNumber || !issueTitle) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 📝 Create Issue
    const issue = await prisma.issue.create({
      data: {
        userId,
        githubUserName: githubUsername,
        issueNumber: issueNumber.toString(),
        issueTitle,
        status: "STARTED",
      },
    });

    await fetch(`http://172.24.132.201:3000/api/notifications/cloned`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        repo,
        title: issueTitle,
      }),
    });

    return NextResponse.json(
      { success: true, issueId: issue.id },
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

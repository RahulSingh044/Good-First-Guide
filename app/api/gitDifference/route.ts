import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const {
            diff,
            insertions,
            deletions,
            repoName,
            repoOwner,
            issueId,
        } = body;

        if (!issueId) {
            return NextResponse.json(
                { error: "issueId is required" },
                { status: 400 }
            );
        }

        const issue = await prisma.issue.findUnique({
            where: { id: issueId },
        });

        if (!issue) {
            return NextResponse.json(
                { error: "Issue not found" },
                { status: 404 }
            );
        }

        const gitDiff = await prisma.gitDiff.upsert({
            where: {
                id: issueId,
            },
            update: {
                diff,
                insertions,
                deletions,
                repoOwner,
                repoName,
            },
            create: {
                diff,
                insertions,
                deletions,
                repoOwner,
                repoName,
                issue: {
                    connect: { id: issueId },
                },
            },
        });

        return NextResponse.json(
            {
                status: "success",
                message: "Git Difference saved successfully",
                data: gitDiff.id,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("error", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};

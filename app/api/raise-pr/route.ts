import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { generatePR } from "@/lib/generatePR";
import { getCurrentUser } from "@/lib/auth/server";

export const POST = async (req: NextRequest) => {
    try {
        // const user = await getCurrentUser();

        // if (!user) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const body = await req.json();
        const { gitDiffId, userId } = body;

        // console

        if (!gitDiffId) {
            return NextResponse.json({ error: "gitDiffId is required" }, { status: 400 });
        }

        const gitDiff = await prisma.gitDiff.findUnique({
            where: { id: gitDiffId },
        });

        if (!gitDiff) {
            return NextResponse.json({ error: "GitDiff not found" }, { status: 404 });
        }

        // Call your model API
        const pr = await generatePR({
            repo: gitDiff.repoName,
            owner: gitDiff.repoOwner,
            diff: gitDiff.diff,
        });

        console.log("pr data", pr);

        // Save PR in DB
        const prInDb = await prisma.pR.create({
            data: {
                prdata: pr.pr_content,
                status: "STARTED",
                userId: userId,
                gitDiffId,
                issueId: gitDiff.issueId,
            },
        });

        return NextResponse.json({
            status: "success",
            message: "PR created successfully",
            data: prInDb,
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error from PR", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};

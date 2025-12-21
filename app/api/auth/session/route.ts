import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyIdToken } from "@/lib/firebase/admin";

export async function POST(req:NextRequest) {
    const { token } = await req.json();
    const decoded = await verifyIdToken(token);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    })

    return NextResponse.json({ uid: decoded.uid });
}
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    
    const decoded = await adminAuth.verifyIdToken(token);
    
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    });
    
    // Update or create user
    const existingUser = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });
    
    if (existingUser) {
      await prisma.user.update({
        where: { firebaseUid: decoded.uid },
        data: {
          email: decoded.email,
          name: decoded.name,
          photoUrl: decoded.picture,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          firebaseUid: decoded.uid,
          email: decoded.email ?? "",
          name: decoded.name ?? "",
          photoUrl: decoded.picture ?? "",
        },
      });
    }
    
    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 5, // 5 days in seconds
      path: "/",
    });
    
    return NextResponse.json({ uid: decoded.uid });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
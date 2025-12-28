import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyIdToken } from "@/lib/firebase/admin";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const decoded = await verifyIdToken(token);

  await prisma.user.upsert({
    where: { firebaseUid: decoded.uid },
    update: {
      email: decoded.email ?? null,
      name: decoded.name ?? null,
      photoUrl: decoded.picture ?? null,
    },
    create: {
      firebaseUid: decoded.uid,
      email: decoded.email ?? null,
      name: decoded.name ?? null,
      photoUrl: decoded.picture ?? null,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ uid: decoded.uid });
}

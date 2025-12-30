import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    return {
      uid: decoded.uid,
      name: decoded.name ?? null,
      email: decoded.email ?? null,
      avatar: decoded.picture ?? null,
    };
  } catch (error) {
    console.error("Error verifying session:", error);
    return null;
  }
}
import { cookies } from "next/headers";
import { verifyIdToken } from "@/lib/firebase/admin";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;

    const decoded = await verifyIdToken(token);

    return {
        uid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
    };
}

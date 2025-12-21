import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export async function loginWithGithub() {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const token = await result.user.getIdToken();

    await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });

    return result.user;
}

export async function logoutUser() {
    await fetch("/api/auth/logout", { method: "POST" });
    await auth.signOut();
}

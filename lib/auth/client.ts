import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export async function loginWithGithub() {
  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const token = await result.user.getIdToken();

    const res = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      throw new Error("Failed to create session");
    }

    return result.user;
  } catch (err) {
    console.error("GitHub login failed:", err);
    throw err;
  }
}


export async function logoutUser() {
    await fetch("/api/auth/logout", { method: "POST" });
    await auth.signOut();
}

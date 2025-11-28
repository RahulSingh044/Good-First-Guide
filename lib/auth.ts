"use client";

import { auth, db, githubProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const loginWithGithub = async () => {
  const res = await signInWithPopup(auth, githubProvider);
  const user = res.user;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      provider: "github",
      createdAt: serverTimestamp(),
    });
  }

  return user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

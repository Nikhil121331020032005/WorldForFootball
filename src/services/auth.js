import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase/firebase";

export async function registerUser({
  email,
  password,
  username,
  team,
}) {
  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = credential.user;

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      email,
      username,
      team,
      createdAt: Date.now(),
    }
  );

  return user;
}

export async function loginUser(
  email,
  password
) {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}
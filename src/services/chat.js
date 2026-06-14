import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase/firebase";

export async function sendMessage(
  roomId,
  user,
  text
) {
  if (!text.trim()) return;

  const userRef = doc(
    db,
    "users",
    user.uid
  );

  const userSnap =
    await getDoc(userRef);

  const userData =
    userSnap.data();

  await addDoc(
    collection(
      db,
      "rooms",
      roomId,
      "messages"
    ),
    {
      uid: user.uid,

      email: user.email,

      username:
        userData?.username ||
        "Unknown User",

      team:
        userData?.team ||
        "No Team",

      text,

      createdAt:
        serverTimestamp(),
    }
  );
}
export async function sendGif(
  roomId,
  user,
  gifUrl
) {
  const userRef =
    doc(
      db,
      "users",
      user.uid
    );

  const userSnap =
    await getDoc(
      userRef
    );

  const userData =
    userSnap.data();

  await addDoc(
    collection(
      db,
      "rooms",
      roomId,
      "messages"
    ),
    {
      uid: user.uid,

      email:user.email,

      username:userData?.username,

      team:userData?.team,

      type: "gif",

      gifUrl,

      createdAt:
        serverTimestamp(),
    }
  );
}
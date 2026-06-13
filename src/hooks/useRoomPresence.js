import {
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  useEffect,
} from "react";

import { db }
from "../services/firebase/firebase";

export default function useRoomPresence(
  roomId,
  user
) {

  useEffect(() => {

    if (!user) return;

    const ref = doc(
      db,
      "presence",
      roomId,
      "users",
      user.uid
    );

    setDoc(ref, {
      uid: user.uid,
      email: user.email,
      joinedAt:
        Date.now(),
    });

    return () => {
      deleteDoc(ref);
    };

  }, [roomId, user]);

}
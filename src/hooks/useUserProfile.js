import { useEffect, useState } from "react";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../services/firebase/firebase";

export default function useUserProfile(
  uid
) {
  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe =
      onSnapshot(
        doc(db, "users", uid),
        (docSnap) => {
          if (docSnap.exists()) {
            setProfile(
              docSnap.data()
            );
          }
        }
      );

    return unsubscribe;
  }, [uid]);

  return profile;
}
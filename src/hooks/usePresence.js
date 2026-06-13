import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { db }
from "../services/firebase/firebase";

export default function usePresence(
  roomId
) {
  const [count, setCount] =
    useState(0);

  useEffect(() => {

    const unsubscribe =
      onSnapshot(
        collection(
          db,
          "presence",
          roomId,
          "users"
        ),
        (snapshot) => {
          setCount(
            snapshot.size
          );
        }
      );

    return unsubscribe;

  }, [roomId]);

  return count;
}
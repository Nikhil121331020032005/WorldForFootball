import { useEffect, useState } from "react";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../services/firebase/firebase";

export default function useMessages(
  roomId
) {
  const [messages, setMessages] =
    useState([]);

  useEffect(() => {
    const q = query(
      collection(
        db,
        "rooms",
        roomId,
        "messages"
      ),
      orderBy(
        "createdAt",
        "asc"
      )
    );

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const data =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setMessages(data);
      });

    return unsubscribe;
  }, [roomId]);

  return messages;
}
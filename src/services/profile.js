import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db }
from "./firebase/firebase";

export async function updateProfile(
  uid,
  data
) {
  await updateDoc(
    doc(
      db,
      "users",
      uid
    ),
    data
  );
}
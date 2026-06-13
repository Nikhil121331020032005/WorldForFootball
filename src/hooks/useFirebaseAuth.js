import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase/firebase";

import { useDispatch } from "react-redux";

import {
  setUser,
  logoutUser,
} from "../slices/authSlice";

export default function useFirebaseAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
            })
          );
        } else {
          dispatch(logoutUser());
        }
      });

    return unsubscribe;
  }, [dispatch]);
}
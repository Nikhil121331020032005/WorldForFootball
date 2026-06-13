import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVpYtK_4OBZmjnvjM7EtI9ElgOXJT_15M",
  authDomain: "worldforfootball.firebaseapp.com",
  projectId: "worldforfootball",
  storageBucket: "worldforfootball.firebasestorage.app",
  messagingSenderId: "41816486891",
  appId: "1:41816486891:web:0ce2c37cc3efa9258b5fae",
  measurementId: "G-LQQHVDDHWW"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
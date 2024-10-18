import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHAD-5nyCJUbuQQicM-8i7OQ0flccps-k",
  authDomain: "spacey-3cbf4.firebaseapp.com",
  projectId: "spacey-3cbf4",
  storageBucket: "spacey-3cbf4.appspot.com",
  messagingSenderId: "276315964955",
  appId: "1:276315964955:web:78cd5891b39fa364209abe",
  measurementId: "G-YB3ZRHSZHP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

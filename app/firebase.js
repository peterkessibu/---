// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB512PI--7Q7-VH5iO3fkCRMoH7ftXYvUs",
  authDomain: "spacey-c810a.firebaseapp.com",
  projectId: "spacey-c810a",
  storageBucket: "spacey-c810a.appspot.com",
  messagingSenderId: "641025427273",
  appId: "1:641025427273:web:899e7ace9256b97361fc98",
  measurementId: "G-JMZ6N6NXLL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

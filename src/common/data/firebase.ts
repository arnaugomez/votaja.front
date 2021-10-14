// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKBbBNhaQuGfjM5AO8irZ1iSCvekZfahM",
  authDomain: "votaja-8e462.firebaseapp.com",
  projectId: "votaja-8e462",
  storageBucket: "votaja-8e462.appspot.com",
  messagingSenderId: "802060236599",
  appId: "1:802060236599:web:70d496e8cef9e993174cb2",
  measurementId: "G-Y2XRXLXCYE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();

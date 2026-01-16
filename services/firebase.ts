// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZkKxZ3AnqrZCWyOQZ2gvLgUpi8FI_Fsk",
  authDomain: "cash-stash-99ecc.firebaseapp.com",
  projectId: "cash-stash-99ecc",
  storageBucket: "cash-stash-99ecc.firebasestorage.app",
  messagingSenderId: "613014162791",
  appId: "1:613014162791:web:ce6836438595427aea33c2",
  measurementId: "G-FQ4QJ0B27T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
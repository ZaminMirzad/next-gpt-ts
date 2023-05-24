import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaTJXacLhPd2n78PmzwpEteek4Q4h680k",
  authDomain: "next-gpt-58fb6.firebaseapp.com",
  projectId: "next-gpt-58fb6",
  storageBucket: "next-gpt-58fb6.appspot.com",
  messagingSenderId: "1017199995267",
  appId: "1:1017199995267:web:a29e5134b9a0173d182eb6",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

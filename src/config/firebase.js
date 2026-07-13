// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL7V0SXvo0a_kp8bSULMqx471f_53mb8c",
  authDomain: "messenger-app-f236f.firebaseapp.com",
  projectId: "messenger-app-f236f",
  storageBucket: "messenger-app-f236f.firebasestorage.app",
  messagingSenderId: "960724386352",
  appId: "1:960724386352:web:d165efc7a7c0953a3b23f5",
  measurementId: "G-8EY07YBWWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
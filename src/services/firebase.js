/**
 * Connects the site to Firebase.
 * These config values are public by design: they only identify the project.
 * Who can read or write data is controlled by the Firestore security rules
 * and by Google sign-in, not by hiding these values.
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-UwkWssKl1s-nVmd39jvAQtiAIV5MNQY",
  authDomain: "bright-portfolio-274bc.firebaseapp.com",
  projectId: "bright-portfolio-274bc",
  storageBucket: "bright-portfolio-274bc.firebasestorage.app",
  messagingSenderId: "946506866333",
  appId: "1:946506866333:web:73e2625e683fe927147e74",
};

const app = initializeApp(firebaseConfig);

/** The Firestore database, used for messages and blog posts. */
export const db = getFirestore(app);

/** Firebase Authentication, used so only the owner can manage content. */
export const auth = getAuth(app);

/** Lets the owner sign in with their Google account. */
export const googleProvider = new GoogleAuthProvider();

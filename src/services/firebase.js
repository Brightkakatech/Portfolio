/**
 * Connects the site to Firebase and sets up sign-in.
 * These config values are public by design: they only identify the project.
 * Who can read or write data is controlled by the Firestore security rules
 * and by sign-in, not by hiding these values.
 * The database is set up separately in db.js, so its code is only
 * downloaded on the pages that use it.
 */
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-UwkWssKl1s-nVmd39jvAQtiAIV5MNQY",
  authDomain: "bright-portfolio-274bc.firebaseapp.com",
  projectId: "bright-portfolio-274bc",
  storageBucket: "bright-portfolio-274bc.firebasestorage.app",
  messagingSenderId: "946506866333",
  appId: "1:946506866333:web:73e2625e683fe927147e74",
};

/** The connection to the Firebase project, shared by auth and the database. */
export const app = initializeApp(firebaseConfig);

/** Firebase Authentication, used for Google and email sign-in. */
export const auth = getAuth(app);

/** Lets users sign in with their Google account. */
export const googleProvider = new GoogleAuthProvider();

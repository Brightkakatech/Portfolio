/**
 * Google sign-in and sign-out. Components use these functions instead of
 * calling Firebase directly, so the sign-in method can change in one place.
 */
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

/**
 * The portfolio owner's email. It must match isOwner() in firestore.rules.
 * The site uses it only to decide what to show; the real protection is the
 * security rules on Firebase's servers.
 */
export const OWNER_EMAIL = "brightkakatech@gmail.com";

/**
 * Opens Google's sign-in window.
 * @returns {Promise<boolean>} True if signed in, false if cancelled or failed.
 */
export async function signIn() {
  try {
    await signInWithPopup(auth, googleProvider);
    return true;
  } catch {
    return false;
  }
}

/** Signs the current user out. */
export async function signOut() {
  await firebaseSignOut(auth);
}

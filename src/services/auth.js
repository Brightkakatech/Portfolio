/**
 * All sign-in actions: Google, email and password, verification and
 * password reset. Components use these functions instead of calling Firebase
 * directly. Every action returns { ok: true } or { ok: false, error },
 * where error is a message a visitor can understand.
 */
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

/**
 * The portfolio owner's email. It must match isOwner() in firestore.rules.
 * The site uses it only to decide what to show; the real protection is the
 * security rules on Firebase's servers.
 */
export const OWNER_EMAIL = "brightkakatech@gmail.com";

// Firebase reports problems as codes such as "auth/weak-password";
// these are turned into plain messages for the visitor
const ERROR_MESSAGES = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/missing-email": "Please enter your email address.",
  "auth/missing-password": "Please enter your password.",
  "auth/weak-password": "Please choose a password of at least 6 characters.",
  "auth/email-already-in-use":
    "An account with this email already exists. Try signing in instead.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/too-many-requests":
    "Too many attempts. Please wait a moment and try again.",
  "auth/popup-closed-by-user":
    "The Google window was closed before signing in finished.",
};

/**
 * Runs a Firebase action and turns any error into a friendly message.
 * @param {() => Promise<unknown>} action
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
async function attempt(action) {
  try {
    await action();
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        ERROR_MESSAGES[error.code] ?? "Something went wrong. Please try again.",
    };
  }
}

/** Where the links in Firebase's emails bring the user back to. */
function returnLink() {
  return {
    url: `${window.location.origin}${import.meta.env.BASE_URL}#/signin`,
  };
}

/** Opens Google's sign-in window. */
export function signInWithGoogle() {
  return attempt(() => signInWithPopup(auth, googleProvider));
}

/**
 * Signs in with an existing email account.
 * @param {string} email
 * @param {string} password
 */
export function signInWithEmail(email, password) {
  return attempt(() =>
    signInWithEmailAndPassword(auth, email.trim(), password),
  );
}

/**
 * Creates an account, saves the user's name, and sends a verification email.
 * @param {string} name - Shown as the author of the user's blog posts.
 * @param {string} email
 * @param {string} password - At least 6 characters (Firebase's minimum).
 */
export function registerWithEmail(name, email, password) {
  return attempt(async () => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );
    await updateProfile(user, { displayName: name });
    // Get a fresh sign-in token so the security rules can see the new name
    await user.getIdToken(true);
    await sendEmailVerification(user, returnLink());
  });
}

/** Sends the verification email again to the signed-in user. */
export function resendVerification() {
  return attempt(() => sendEmailVerification(auth.currentUser, returnLink()));
}

/**
 * Sends a password reset link. For privacy, Firebase does not reveal
 * whether an account exists for the email address.
 * @param {string} email
 */
export function resetPassword(email) {
  return attempt(() =>
    sendPasswordResetEmail(auth, email.trim(), returnLink()),
  );
}

/**
 * Re-reads the user's details from Firebase, for example after they have
 * clicked the verification link in another tab.
 * @returns {Promise<{ok: boolean, error?: string, verified?: boolean}>}
 */
export async function refreshUser() {
  const user = auth.currentUser;
  if (!user) return { ok: false, error: "You are not signed in." };

  const result = await attempt(async () => {
    await user.reload();
    await user.getIdToken(true);
  });
  return { ...result, verified: user.emailVerified };
}

/** Signs the current user out. */
export function signOut() {
  return firebaseSignOut(auth);
}

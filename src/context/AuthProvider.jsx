import { useEffect, useState } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { OWNER_EMAIL } from "../services/auth";
import { AuthContext } from "./AuthContext";

/**
 * Copies the fields the site needs from Firebase's user object.
 * A new plain object each time means React notices every change,
 * such as a new name or a newly verified email.
 * @param {import("firebase/auth").User | null} currentUser
 */
function toUser(currentUser) {
  if (!currentUser) return null;
  return {
    uid: currentUser.uid,
    email: currentUser.email,
    displayName: currentUser.displayName,
    emailVerified: currentUser.emailVerified,
  };
}

/**
 * Keeps track of who is signed in and shares it with the whole app.
 * onIdTokenChanged reports the user when the page loads, on sign-in and
 * sign-out, and whenever their details are refreshed.
 * @param {object} props
 * @param {import("react").ReactNode} props.children - The app inside the provider.
 */
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Returns a function that stops listening, which React calls on close
    return onIdTokenChanged(auth, (currentUser) => {
      setUser(toUser(currentUser));
      setLoading(false);
    });
  }, []);

  const isOwner = user?.email === OWNER_EMAIL && user.emailVerified;

  return (
    <AuthContext.Provider value={{ user, isOwner, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

import { useEffect, useState, type ReactNode } from "react";
import { onIdTokenChanged, type User as FirebaseUser } from "firebase/auth";
import { auth } from "../services/firebase";
import { OWNER_EMAIL } from "../services/auth";
import { AuthContext } from "./AuthContext";
import type { User } from "../types";

/**
 * Copies the fields the site needs from Firebase's user object.
 * A new plain object each time means React notices every change,
 * such as a new name or a newly verified email.
 */
function toUser(currentUser: FirebaseUser | null): User | null {
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
 * @param children - The app inside the provider.
 */
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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

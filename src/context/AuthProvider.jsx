import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { OWNER_EMAIL } from "../services/auth";
import { AuthContext } from "./AuthContext";

/**
 * Keeps track of who is signed in and shares it with the whole app.
 * Firebase remembers a sign-in between visits; onAuthStateChanged reports
 * the current user when the page loads and again whenever it changes.
 * @param {object} props
 * @param {import("react").ReactNode} props.children - The app inside the provider.
 */
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns a function that stops listening,
    // which React calls when the app closes
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const isOwner = user?.email === OWNER_EMAIL;

  return (
    <AuthContext.Provider value={{ user, isOwner, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

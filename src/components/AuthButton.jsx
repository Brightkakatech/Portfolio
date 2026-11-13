import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../services/auth";

/**
 * Sign in / Sign out control for the Navbar.
 * Signed out: a link to the sign-in page. Signed in: a button showing
 * the user's first name that signs them out.
 */
function AuthButton() {
  const { user, loading } = useAuth();

  // Show nothing while Firebase checks for a saved sign-in,
  // so the button doesn't flash "Sign in" for a signed-in user
  if (loading) return null;

  if (!user) {
    return (
      <NavLink to="/signin" className="btn-auth">
        Sign in
      </NavLink>
    );
  }

  const firstName = user.displayName?.split(" ")[0] ?? "Account";

  return (
    <button
      className="btn-auth"
      onClick={signOut}
      title={`Signed in as ${user.email}`}
    >
      Sign out ({firstName})
    </button>
  );
}

export default AuthButton;

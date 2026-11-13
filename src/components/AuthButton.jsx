import { useAuth } from "../context/AuthContext";
import { signIn, signOut } from "../services/auth";

/**
 * Sign in / Sign out button for the Navbar.
 * Shows the user's first name while signed in.
 */
function AuthButton() {
  const { user, loading } = useAuth();

  // Show nothing while Firebase checks for a saved sign-in,
  // so the button doesn't flash "Sign in" for a signed-in user
  if (loading) return null;

  if (!user) {
    return (
      <button className="btn-auth" onClick={signIn}>
        Sign in
      </button>
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

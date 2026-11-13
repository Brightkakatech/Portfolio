import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  resetPassword,
  resendVerification,
  refreshUser,
} from "../services/auth";

const TITLES = {
  signin: "Sign in",
  register: "Create an account",
  reset: "Reset your password",
};

const SUBMIT_LABELS = {
  signin: "Sign in",
  register: "Create account",
  reset: "Send reset link",
};

/**
 * Sign-in page with three modes: sign in, create an account, and reset a
 * forgotten password. Google sign-in is offered as well. Users who have
 * registered but not yet verified their email are shown how to finish.
 */
function SignIn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("signin"); // "signin", "register" or "reset"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  /**
   * Runs a sign-in action while disabling the buttons, and shows any error.
   * @returns {Promise<object>} The action's result.
   */
  async function run(action) {
    setBusy(true);
    setNotice(null);
    const result = await action();
    setBusy(false);
    if (!result.ok) setNotice({ type: "error", text: result.error });
    return result;
  }

  // Changing mode clears any old message
  function switchMode(newMode) {
    setMode(newMode);
    setNotice(null);
  }

  async function handleGoogle() {
    const result = await run(signInWithGoogle);
    if (result.ok) navigate("/blog");
  }

  async function handleSubmit(event) {
    event.preventDefault(); // handle the form here instead of reloading the page

    if (mode === "signin") {
      const result = await run(() => signInWithEmail(email, password));
      if (result.ok) navigate("/blog");
    } else if (mode === "register") {
      if (!name.trim()) {
        setNotice({ type: "error", text: "Please enter your name." });
        return;
      }
      const result = await run(() =>
        registerWithEmail(name.trim(), email, password),
      );
      if (result.ok) {
        setNotice({
          type: "success",
          text: "Account created. Check your inbox for a verification link.",
        });
      }
    } else {
      const result = await run(() => resetPassword(email));
      if (result.ok) {
        setNotice({
          type: "success",
          text: "If an account exists for this email, a reset link is on its way.",
        });
      }
    }
  }

  async function handleCheckVerified() {
    const result = await run(refreshUser);
    if (result.ok && !result.verified) {
      setNotice({
        type: "error",
        text: "Not verified yet. Click the link in the email (check your spam folder too).",
      });
    }
  }

  async function handleResend() {
    const result = await run(resendVerification);
    if (result.ok) {
      setNotice({ type: "success", text: "Verification email sent again." });
    }
  }

  const noticeElement = notice && (
    <p className={`notice notice-${notice.type}`} role="status">
      {notice.text}
    </p>
  );

  // Signed in, but the email address has not been confirmed yet
  if (user && !user.emailVerified) {
    return (
      <section className="auth-page">
        <h1>Verify your email</h1>
        <p className="page-intro">
          We sent a link to <strong>{user.email}</strong>. Click it, then come
          back and press the button below. You can post on the blog once your
          email is verified.
        </p>
        <div className="auth-actions">
          <button
            className="btn btn-primary"
            disabled={busy}
            onClick={handleCheckVerified}
          >
            I have verified my email
          </button>
          <button
            className="btn btn-secondary"
            disabled={busy}
            onClick={handleResend}
          >
            Send the email again
          </button>
        </div>
        {noticeElement}
      </section>
    );
  }

  // Already signed in and verified
  if (user) {
    return (
      <section className="auth-page">
        <h1>You are signed in</h1>
        <p className="page-intro">
          Signed in as <strong>{user.displayName ?? user.email}</strong>. You
          can now write on the blog.
        </p>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <h1>{TITLES[mode]}</h1>
      <p className="page-intro">
        Sign in to write on the blog. You can send me a message without an
        account.
      </p>

      {mode !== "reset" && (
        <>
          <button
            className="btn btn-secondary auth-google"
            disabled={busy}
            onClick={handleGoogle}
          >
            Continue with Google
          </button>
          <p className="auth-divider">or use your email</p>
        </>
      )}

      <form className="blog-form" onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
            <label htmlFor="auth-name">Name</label>
            <input
              id="auth-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </>
        )}

        <label htmlFor="auth-email">Email</label>
        <input
          id="auth-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {mode !== "reset" && (
          <>
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </>
        )}

        <button type="submit" className="btn btn-primary" disabled={busy}>
          {SUBMIT_LABELS[mode]}
        </button>
      </form>

      {noticeElement}

      <div className="auth-links">
        {mode === "signin" ? (
          <>
            <button
              className="link-button"
              onClick={() => switchMode("register")}
            >
              Create an account
            </button>
            <button className="link-button" onClick={() => switchMode("reset")}>
              Forgot password?
            </button>
          </>
        ) : (
          <button className="link-button" onClick={() => switchMode("signin")}>
            Back to sign in
          </button>
        )}
      </div>
    </section>
  );
}

export default SignIn;

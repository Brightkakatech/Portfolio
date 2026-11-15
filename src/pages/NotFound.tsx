import { Link, useLocation } from "react-router-dom";

/**
 * Shown for any address that doesn't match a page, instead of a blank screen.
 * It names the address that failed and offers a way back.
 */
function NotFound() {
  // The address the visitor tried, e.g. "/abc"
  const { pathname } = useLocation();

  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <p className="page-intro">
        There is no page at <code>{pathname}</code>. The address may be
        mistyped, or the page may have moved.
      </p>
      <div className="hero-buttons">
        <Link to="/" className="btn btn-primary">
          Go to the home page
        </Link>
        <Link to="/messages" className="btn btn-secondary">
          Contact me
        </Link>
      </div>
    </section>
  );
}

export default NotFound;

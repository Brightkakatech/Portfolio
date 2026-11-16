import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";

/**
 * Site footer, shown on every page: GitHub, LinkedIn and Medium icons,
 * the copyright notice and the link to the README page.
 */
function Footer() {
  // Works out the current year automatically, so it never goes out of date
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <SocialLinks />
      <p>© {year} Bright Amalahu. All Rights Reserved.</p>
      <Link to="/readme" className="footer-link">
        Readme
      </Link>
    </footer>
  );
}

export default Footer;

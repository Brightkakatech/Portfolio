import { Link } from "react-router-dom";

function Footer() {
  // Works out the current year automatically, so it never goes out of date
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Bright Amalahu. All Rights Reserved.</p>
      <Link to="/readme" className="footer-link">Readme</Link>
    </footer>
  );
}

export default Footer;
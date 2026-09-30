import { Link } from "react-router-dom";

function Footer() {
  // Works out the current year automatically, so it never goes out of date
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Bright Amalahu. Built with React.</p>
      <Link to="/readme" className="footer-link">Readme: how this site is built</Link>
    </footer>
  );
}

export default Footer;
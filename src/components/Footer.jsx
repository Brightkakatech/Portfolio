function Footer() {
  // Works out the current year automatically, so it never goes out of date
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="mailto:your-email@example.com">Email</a>
        <a href="https://github.com/YOUR-USERNAME" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/YOUR-PROFILE" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      <p>© {year} Bright Amalahu. Built with React.</p>
    </footer>
  );
}

export default Footer;
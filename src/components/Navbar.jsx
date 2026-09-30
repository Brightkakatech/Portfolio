import { NavLink } from "react-router-dom";

// One list of all pages in the menu – add or remove a page here and the menu updates
// (the Readme page is linked from the Footer instead)
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/education", label: "Education" },
  { to: "/knowledge", label: "Professional Knowledge" },
  { to: "/pictures", label: "Pictures Gallery" },
  { to: "/videos", label: "Video Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/messages", label: "Messages" },
];

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        Bright Amalahu
      </NavLink>

      <nav className="nav-links">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end className="nav-link">
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
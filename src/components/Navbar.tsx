import { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthButton from "./AuthButton";
import NavSearch from "./NavSearch";
import ThemeToggle from "./ThemeToggle";

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

/**
 * Main menu, built from the links list above. NavLink highlights the page
 * the visitor is on; "end" stops Home from staying highlighted on every page.
 * The theme switch, the search icon and the sign-in button sit at the
 * right-hand end.
 * On phones the links are hidden behind a menu button (☰), so the menu
 * takes one row instead of four; tapping a link closes the menu again.
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
        Bright Amalahu
      </NavLink>

      {/* Only visible on small screens (see the phone styles in index.css) */}
      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="main-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav id="main-menu" className={menuOpen ? "nav-links open" : "nav-links"}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <ThemeToggle />
        <NavSearch />
        <AuthButton />
      </nav>
    </header>
  );
}

export default Navbar;

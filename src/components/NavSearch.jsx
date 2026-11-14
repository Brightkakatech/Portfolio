import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Compact site-wide search for the Navbar. It shows only a magnifier icon
 * until clicked, then a small search box in the same place, so the menu
 * stays uncluttered. Enter shows the results; Escape or clicking away closes it.
 */
function NavSearch() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading, so React can open the results
    const term = text.trim();
    if (!term) return;
    // encodeURIComponent makes spaces and symbols safe to put in an address
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setText("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        className="nav-search-toggle"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        title="Search"
      >
        {/* Magnifier icon, drawn in code so no image file is needed */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
      </button>
    );
  }

  return (
    <form role="search" className="nav-search" onSubmit={handleSubmit}>
      <input
        type="search"
        autoFocus
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        // Close again if the visitor clicks away without typing anything
        onBlur={() => {
          if (!text.trim()) setOpen(false);
        }}
        placeholder="Search…"
        aria-label="Search the site"
      />
    </form>
  );
}

export default NavSearch;

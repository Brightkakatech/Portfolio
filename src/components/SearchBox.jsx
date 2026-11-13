import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A site-wide search box. Pressing Enter opens the Search page with the
 * typed words in the address, e.g. #/search?q=azure, so a search can be
 * bookmarked or shared like any page.
 * @param {object} props
 * @param {string} [props.initial=""] - Text to start with.
 * @param {string} [props.className="search-box"] - Allows a larger style on Home.
 */
function SearchBox({ initial = "", className = "search-box" }) {
  const [text, setText] = useState(initial);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading, so React can open the results
    const term = text.trim();
    // encodeURIComponent makes spaces and symbols safe to put in an address
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <form role="search" className={className} onSubmit={handleSubmit}>
      <input
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Search the site"
        aria-label="Search the site"
      />
    </form>
  );
}

export default SearchBox;

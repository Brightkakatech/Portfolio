import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A site-wide search box. Pressing Enter opens the Search page with the
 * typed words in the address, e.g. #/search?q=azure, so a search can be
 * bookmarked or shared like any page.
 * @param initial - Text to start with.
 * @param className - Allows a larger style on the Search page.
 */
/** The props SearchBox accepts; both are optional. */
interface SearchBoxProps {
  initial?: string;
  className?: string;
}

function SearchBox({ initial = "", className = "search-box" }: SearchBoxProps) {
  const [text, setText] = useState(initial);
  const navigate = useNavigate();

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
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

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import { useJsonData } from "../hooks/useJsonData";
import { fetchPosts } from "../services/posts";
import { fetchRepos } from "../services/github";
import { buildSearchIndex, searchSite } from "../utils/searchSite";

/**
 * Site-wide search results. Reads the words from the address (?q=...),
 * gathers the content of every page, and lists the matches with a short
 * extract and a link. If one source can't be loaded, the rest are still searched.
 */
function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";

  // Page content from the JSON files
  const about = useJsonData("about");
  const education = useJsonData("education");
  const knowledge = useJsonData("knowledge");

  // Blog posts (Firestore) and projects (GitHub), fetched once
  const [online, setOnline] = useState({ posts: null, repos: null });

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchPosts(), fetchRepos(30)]).then(
      ([postResult, repoResult]) => {
        if (!cancelled) {
          setOnline({ posts: postResult.posts, repos: repoResult.repos ?? [] });
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  // Still loading if any source has neither data nor an error yet
  const stillLoading =
    [about, education, knowledge].some(
      (source) => !source.data && !source.error,
    ) || online.posts === null;

  const index = buildSearchIndex({
    about: about.data,
    education: education.data ?? [],
    knowledge: knowledge.data ?? undefined,
    posts: online.posts ?? [],
    repos: online.repos ?? [],
  });
  const results = searchSite(index, query);

  return (
    <section>
      <h1>Search</h1>
      {/* key={query} resets the box when a new search is made from the Navbar */}
      <SearchBox
        key={query}
        initial={query}
        className="search-box search-box--large"
      />

      {!query.trim() ? (
        <p className="page-intro">
          Type a word above to search the whole site.
        </p>
      ) : stillLoading ? (
        <p className="page-intro">Searching…</p>
      ) : (
        <>
          <p className="blog-count" role="status">
            {results.length} {results.length === 1 ? "result" : "results"} for “
            {query}”
          </p>

          <ul className="search-results">
            {results.map((result, position) => (
              <li key={`${result.section}-${result.title}-${position}`}>
                {result.external ? (
                  <a
                    className="search-result"
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="search-section">{result.section}</span>
                    <h2>{result.title}</h2>
                    <p>{result.snippet}</p>
                  </a>
                ) : (
                  <Link className="search-result" to={result.link}>
                    <span className="search-section">{result.section}</span>
                    <h2>{result.title}</h2>
                    <p>{result.snippet}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default Search;

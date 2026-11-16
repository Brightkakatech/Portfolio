import { useEffect, useState } from "react";
import { fetchRepos, PROFILE_URL } from "../services/github";
import { formatDate } from "../utils/format";
import { filterByLanguage, listLanguages } from "../utils/repos";
import { useRevealOnScroll } from "../hooks/useAnimations";
import type { Repo } from "../types";

/**
 * "Latest projects on GitHub": the owner's public repositories, loaded live
 * from the GitHub API each time the page opens, so the list stays up to
 * date without editing the site. Cards fade in as they scroll into view.
 * Language chips above the cards filter the projects by language.
 */
function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null); // null until GitHub answers
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("all"); // the chosen language chip

  // Fade each project card in once GitHub's answer has arrived
  const gridRef = useRevealOnScroll<HTMLDivElement>(".repo-card", [
    repos,
    language,
  ]);

  useEffect(() => {
    // If the visitor leaves before GitHub answers, ignore the answer
    let cancelled = false;

    fetchRepos(12).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setRepos(result.repos);
      } else {
        setRepos([]);
        setError(result.error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const languages = listLanguages(repos ?? []);
  const shown = filterByLanguage(repos ?? [], language);

  return (
    <>
      <h2 className="section-title">Latest projects on GitHub</h2>

      {repos === null && <p className="page-intro">Loading projects…</p>}

      {error && (
        <p className="page-intro">
          {error} You can still see them on{" "}
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
            my GitHub profile
          </a>
          .
        </p>
      )}

      {repos && repos.length > 0 && (
        <>
          <p className="repo-summary">
            {repos.length} recent projects in {languages.length}{" "}
            {languages.length === 1 ? "language" : "languages"}. Pick one to
            filter:
          </p>
          <div
            className="chips"
            role="group"
            aria-label="Filter projects by language"
          >
            {["all", ...languages].map((name) => (
              <button
                key={name}
                className={name === language ? "chip active" : "chip"}
                aria-pressed={name === language}
                onClick={() => setLanguage(name)}
              >
                {name === "all" ? "All" : name}
              </button>
            ))}
          </div>
        </>
      )}

      {shown.length > 0 && (
        <div className="repo-grid" ref={gridRef}>
          {shown.map((repo) => (
            <a
              className="repo-card"
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{repo.name}</h3>
              <p>{repo.description ?? "No description yet."}</p>
              <p className="repo-meta">
                {repo.language && `${repo.language} · `}
                Updated {formatDate(repo.updated)}
                {repo.stars > 0 && ` · ★ ${repo.stars}`}
              </p>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default GitHubRepos;

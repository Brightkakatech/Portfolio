import { useEffect, useState } from "react";
import { fetchRepos, PROFILE_URL } from "../services/github";
import { formatDate } from "../utils/format";

/**
 * "Latest projects on GitHub": the owner's public repositories, loaded live
 * from the GitHub API each time the page opens, so the list stays up to
 * date without editing the site.
 */
function GitHubRepos() {
  const [repos, setRepos] = useState(null); // null until GitHub answers
  const [error, setError] = useState("");

  useEffect(() => {
    // If the visitor leaves before GitHub answers, ignore the answer
    let cancelled = false;

    fetchRepos().then((result) => {
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
        <div className="repo-grid">
          {repos.map((repo) => (
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

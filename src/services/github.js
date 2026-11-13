/**
 * Reads public repository information from the GitHub REST API.
 * Public data needs no key or sign-in; GitHub allows 60 requests an hour
 * per visitor, which is plenty for a portfolio.
 */
const USERNAME = "Brightkakatech";

/** The owner's GitHub profile, linked when the API can't be reached. */
export const PROFILE_URL = `https://github.com/${USERNAME}`;

/**
 * Fetches the owner's public repositories, most recently updated first.
 * Forks are left out, so only the owner's own projects are shown.
 * @param {number} [count=6] - How many repositories to ask for.
 * @returns {Promise<{ok: boolean, repos?: Array<{id: number, name: string, description: string | null, url: string, language: string | null, stars: number, updated: string}>, error?: string}>}
 */
export async function fetchRepos(count = 6) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=${count}`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) throw new Error(`GitHub responded ${response.status}`);

    const data = await response.json();
    const repos = data
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        updated: repo.pushed_at,
      }));

    return { ok: true, repos };
  } catch {
    return {
      ok: false,
      error: "My GitHub projects could not be loaded right now.",
    };
  }
}

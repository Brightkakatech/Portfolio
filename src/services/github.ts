/**
 * Reads public repository information from the GitHub REST API.
 * Public data needs no key or sign-in; GitHub allows 60 requests an hour
 * per visitor, which is plenty for a portfolio.
 */
import type { Repo } from "../types";

const USERNAME = "Brightkakatech";

/** The owner's GitHub profile, linked when the API can't be reached. */
export const PROFILE_URL = `https://github.com/${USERNAME}`;

/** The fields this site reads from GitHub's answer (it sends many more). */
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

/** What fetchRepos returns: the repositories, or an error message. */
export type ReposResult =
  { ok: true; repos: Repo[] } | { ok: false; repos: Repo[]; error: string };

/**
 * Fetches the owner's public repositories, most recently updated first.
 * Forks are left out, so only the owner's own projects are shown.
 * @param count - How many repositories to ask for.
 */
export async function fetchRepos(count = 6): Promise<ReposResult> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=${count}`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) throw new Error(`GitHub responded ${response.status}`);

    const data = (await response.json()) as GitHubRepo[];
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
      repos: [],
      error: "My GitHub projects could not be loaded right now.",
    };
  }
}

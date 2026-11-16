/**
 * Helpers for the GitHub projects section: the language filter chips and
 * the summary line. Kept separate so they can be tested on their own.
 */
import type { Repo } from "../types";

/** Each programming language used by the projects, once, A to Z. */
export function listLanguages(repos: Pick<Repo, "language">[]): string[] {
  const languages = repos
    .map((repo) => repo.language)
    .filter((language): language is string => language !== null);
  return [...new Set(languages)].sort();
}

/**
 * The projects written in one language, or all of them.
 * @param language - A language name, or "all".
 */
export function filterByLanguage<T extends Pick<Repo, "language">>(
  repos: T[],
  language: string,
): T[] {
  if (language === "all") return repos;
  return repos.filter((repo) => repo.language === language);
}

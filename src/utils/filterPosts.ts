/**
 * Search and filter logic for the Blog. Kept separate from the page so
 * it can be tested on its own, without rendering anything.
 */
import type { Post } from "../types";

/**
 * Returns the posts that match a search term and an author.
 * Pick<Post, ...> means "any object with at least these Post fields",
 * which keeps the function easy to test with small example objects.
 * @param search - Matched against the title and text, ignoring capitals.
 * @param author - An author's name, or "all" for every author.
 * @returns The matching posts, in their original order.
 */
export function filterPosts<
  T extends Pick<Post, "title" | "content" | "authorName">,
>(posts: T[], search: string, author: string): T[] {
  const term = search.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesAuthor = author === "all" || post.authorName === author;
    const matchesSearch =
      term === "" ||
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term);
    return matchesAuthor && matchesSearch;
  });
}

/**
 * Lists each author once, in alphabetical order, for the filter dropdown.
 */
export function listAuthors(posts: Pick<Post, "authorName">[]): string[] {
  return [...new Set(posts.map((post) => post.authorName))].sort();
}

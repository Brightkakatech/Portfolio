/**
 * Search and filter logic for the Blog. Kept separate from the page so
 * it can be tested on its own, without rendering anything.
 */

/**
 * Returns the posts that match a search term and an author.
 * @param {Array<{title: string, content: string, authorName: string}>} posts
 * @param {string} search - Matched against the title and text, ignoring capitals.
 * @param {string} author - An author's name, or "all" for every author.
 * @returns {Array} The matching posts, in their original order.
 */
export function filterPosts(posts, search, author) {
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
 * @param {Array<{authorName: string}>} posts
 * @returns {string[]}
 */
export function listAuthors(posts) {
  return [...new Set(posts.map((post) => post.authorName))].sort();
}

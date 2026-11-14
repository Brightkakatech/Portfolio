/**
 * Site-wide search logic. buildSearchIndex turns every page's content into
 * one list of searchable entries; searchSite finds the entries that match.
 * Kept separate from the page so both can be tested on their own.
 */

/**
 * Collects searchable entries from all content. Any source that failed to
 * load can be left out; search still works on the rest.
 * @param {object} sources - about, education, knowledge, posts and repos.
 * @returns {Array<{section: string, title: string, text: string, link: string, external?: boolean}>}
 */
export function buildSearchIndex({
  about = null,
  education = [],
  knowledge = { skillGroups: [], experience: [] },
  posts = [],
  repos = [],
}) {
  const index = [];

  if (about) {
    index.push({
      section: "About",
      title: "About me",
      text: [
        about.intro,
        ...about.story,
        ...about.highlights.map((item) => `${item.title}: ${item.text}`),
        ...about.interests,
      ].join(" "),
      link: "/about",
    });
  }

  for (const item of education) {
    index.push({
      section: "Education",
      title: item.qualification,
      text: [
        item.institution,
        item.location,
        item.years,
        ...(item.details ?? []),
      ].join(" "),
      link: "/education",
    });
  }

  for (const group of knowledge.skillGroups) {
    index.push({
      section: "Skills",
      title: group.category,
      text: group.items.join(", "),
      link: "/knowledge",
    });
  }

  for (const job of knowledge.experience) {
    index.push({
      section: "Experience",
      title: `${job.role}, ${job.organisation}`,
      text: [job.location, job.years, ...job.points].join(" "),
      link: "/knowledge",
    });
  }

  for (const post of posts) {
    index.push({
      section: "Blog",
      title: post.title,
      text: post.content,
      link: "/blog",
    });
  }

  for (const repo of repos) {
    index.push({
      section: "GitHub projects",
      title: repo.name,
      text: repo.description ?? "",
      link: repo.url,
      external: true,
    });
  }

  return index;
}

/**
 * Cuts out the part of the text around the first match, e.g.
 * "…administers Active Directory for user provisioning…".
 * @param {string} text
 * @param {string} term - Already in lower case.
 * @param {number} [size=140] - Roughly how many characters to show.
 * @returns {string}
 */
export function makeSnippet(text, term, size = 140) {
  const found = text.toLowerCase().indexOf(term);
  const start = found > 50 ? found - 50 : 0;
  const end = Math.min(text.length, start + size);
  return (
    (start > 0 ? "…" : "") +
    text.slice(start, end) +
    (end < text.length ? "…" : "")
  );
}

/**
 * Finds the entries whose title or text contains the query, ignoring capitals.
 * @param {ReturnType<typeof buildSearchIndex>} index
 * @param {string} query
 * @returns {Array} Matching entries, each with a snippet added.
 */
export function searchSite(index, query) {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  return index
    .filter(
      (entry) =>
        entry.title.toLowerCase().includes(term) ||
        entry.text.toLowerCase().includes(term),
    )
    .map((entry) => ({ ...entry, snippet: makeSnippet(entry.text, term) }));
}

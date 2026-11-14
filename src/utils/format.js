/**
 * Date formatting shared by the Blog, the chat and the Inbox,
 * so every page shows dates the same way.
 */

/**
 * Formats a time for messages, e.g. "28 Sept, 14:05".
 * @param {string} time - An ISO date string.
 * @returns {string}
 */
export function formatTime(time) {
  return new Date(time).toLocaleString("en-IE", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formats a date for blog posts, e.g. "28 September 2026".
 * @param {string} date - An ISO date string.
 * @returns {string}
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

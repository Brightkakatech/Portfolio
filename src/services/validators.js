/**
 * Checks that saved records have the expected shape before they are shown,
 * so a damaged or edited record cannot break the page.
 */

/**
 * @param {unknown} message - A record loaded from storage.
 * @returns {boolean} True if it has an id, name, text and time.
 */
export function isValidMessage(message) {
  return (
    typeof message === "object" &&
    message !== null &&
    typeof message.id === "number" &&
    typeof message.name === "string" &&
    typeof message.text === "string" &&
    typeof message.time === "string"
  );
}

/**
 * @param {unknown} post - A record loaded from storage.
 * @returns {boolean} True if it has an id, title, date and content.
 */
export function isValidPost(post) {
  return (
    typeof post === "object" &&
    post !== null &&
    typeof post.id === "number" &&
    typeof post.title === "string" &&
    typeof post.date === "string" &&
    typeof post.content === "string"
  );
}
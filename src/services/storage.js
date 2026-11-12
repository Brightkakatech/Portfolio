/**
 * Reads and writes lists in the browser's localStorage.
 * Pages use these functions instead of calling localStorage directly,
 * so the storage method can be changed in one place later.
 */

/**
 * Loads a saved list and keeps only the items that pass a check.
 * @param {string} key - The name the list is saved under.
 * @param {(item: unknown) => boolean} isValid - Returns true for a well-formed item.
 * @param {Array} [fallback=[]] - Returned when nothing usable is saved.
 * @returns {Array} The valid saved items, or the fallback.
 */
export function loadList(key, isValid, fallback = []) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return fallback;
    return parsed.filter(isValid);
  } catch {
    return fallback;
  }
}

/**
 * Saves a list. Returns false instead of crashing if the browser
 * refuses, for example when storage is full or blocked.
 * @param {string} key - The name to save the list under.
 * @param {Array} list - The items to save.
 * @returns {boolean} True if saved, false if saving failed.
 */
export function saveList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

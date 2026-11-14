/**
 * Reads and writes lists in the browser's localStorage.
 * Pages use these functions instead of calling localStorage directly,
 * so the storage method can be changed in one place later.
 */

/**
 * Loads a saved list and keeps only the items that pass a check.
 * The check is a "type guard": it tells TypeScript that every item that
 * passes really is a T, so the result is typed as T[].
 * @param key - The name the list is saved under.
 * @param isValid - Returns true for a well-formed item.
 * @param fallback - Returned when nothing usable is saved.
 * @returns The valid saved items, or the fallback.
 */
export function loadList<T>(
  key: string,
  isValid: (item: unknown) => item is T,
  fallback: T[] = [],
): T[] {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return fallback;
    return parsed.filter(isValid);
  } catch {
    return fallback;
  }
}

/**
 * Saves a list. Returns false instead of crashing if the browser
 * refuses, for example when storage is full or blocked.
 * @param key - The name to save the list under.
 * @param list - The items to save.
 * @returns True if saved, false if saving failed.
 */
export function saveList<T>(key: string, list: T[]): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

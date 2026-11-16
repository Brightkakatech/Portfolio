/**
 * Light and dark colour themes. The chosen theme is stored on the <html>
 * element as data-theme="light" or "dark"; index.css swaps its colour
 * variables to match. index.html applies the saved theme before the page
 * appears, so it never flashes the wrong colours.
 */

export type Theme = "light" | "dark";

/** The name the visitor's choice is saved under in their browser. */
export const THEME_KEY = "theme";

/**
 * Picks the theme to use: the visitor's saved choice if there is one,
 * otherwise their device setting.
 * @param saved - The saved value, or null if nothing was saved.
 * @param prefersDark - Whether the device is set to dark mode.
 */
export function resolveTheme(
  saved: string | null,
  prefersDark: boolean,
): Theme {
  if (saved === "light" || saved === "dark") return saved;
  return prefersDark ? "dark" : "light";
}

/** The theme currently shown on the page. */
export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** Shows a theme and remembers it for the visitor's next visit. */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage blocked (e.g. some private windows): the theme still changes,
    // it just won't be remembered next time
  }
}

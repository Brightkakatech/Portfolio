import { useEffect, useState } from "react";

/**
 * Loads a JSON file from public/data while the site is running, so page
 * content is kept separate from the code and only downloaded when needed.
 * @param {string} name - The file name without ".json", e.g. "education".
 * @returns {{data: any, error: string}} data is null until the file has
 *   loaded; error is a message for the visitor if loading failed.
 */
export function useJsonData(name) {
  const [state, setState] = useState({ data: null, error: "" });

  useEffect(() => {
    // If the visitor leaves the page before the file arrives, ignore it
    let cancelled = false;

    fetch(`${import.meta.env.BASE_URL}data/${name}.json`)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setState({ data, error: "" });
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            data: null,
            error: "This content could not be loaded. Please refresh the page.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [name]);

  return state;
}

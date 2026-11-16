import { useEffect, useState } from "react";

/** True if the visitor has asked their device to reduce motion. */
function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Types each phrase out letter by letter, pauses, deletes it, then moves on
 * to the next one, forever. Visitors who prefer reduced motion simply see
 * the first phrase, without movement.
 * @param phrases - The phrases to cycle through. Keep the array outside the
 *   component (or memoised) so the effect doesn't restart on every render.
 * @param typingMs - Delay between letters.
 * @param pauseMs - How long a finished phrase stays before it is deleted.
 * @returns The text to show at this moment.
 */
export function useTypewriter(
  phrases: readonly string[],
  typingMs = 70,
  pauseMs = 1600,
): string {
  const [text, setText] = useState(() =>
    prefersReducedMotion() ? phrases[0] : "",
  );

  useEffect(() => {
    if (prefersReducedMotion() || phrases.length === 0) return;

    let phraseIndex = 0;
    let letters = 0;
    let deleting = false;
    let timer = 0;

    // Each step adds or removes one letter, then schedules the next step
    function step() {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        letters += 1;
        setText(phrase.slice(0, letters));
        if (letters === phrase.length) {
          deleting = true;
          timer = window.setTimeout(step, pauseMs);
          return;
        }
      } else {
        letters -= 1;
        setText(phrase.slice(0, letters));
        if (letters === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      timer = window.setTimeout(step, deleting ? typingMs / 2 : typingMs);
    }

    timer = window.setTimeout(step, typingMs);
    return () => window.clearTimeout(timer);
  }, [phrases, typingMs, pauseMs]);

  return text;
}

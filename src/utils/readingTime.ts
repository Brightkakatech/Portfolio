/**
 * Estimates how long a text takes to read, at about 200 words a minute,
 * e.g. "2 min read". Very short texts still show "1 min read".
 */
export function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

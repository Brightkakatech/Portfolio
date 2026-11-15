/**
 * Helpers for contacting visitors back from the Inbox. Kept separate from
 * the components so they can be tested on their own.
 */
import type { InboxMessage } from "../types";

/**
 * A simple check that text looks like an email address (something@site.ext).
 * It does not prove the address exists; it catches obvious typing mistakes.
 * The same pattern is enforced again by firestore.rules on the server.
 */
export function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
}

/**
 * Builds a "mailto:" link that opens the owner's email app with the
 * visitor's address, a subject and their original message quoted below.
 * encodeURIComponent makes spaces, line breaks and symbols safe in a link.
 * @returns The link, or null if the visitor left no email address.
 */
export function buildReplyLink(message: InboxMessage): string | null {
  if (!message.email) return null;

  const subject = "Re: your message on my portfolio";
  const quoted = message.text
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");
  const body = `Hi ${message.name},\n\n\n\nOn my portfolio you wrote:\n${quoted}`;

  return (
    `mailto:${message.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}

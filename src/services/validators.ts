import type { SentMessage } from "../types";

/**
 * Checks that a message loaded from the browser has the expected shape
 * before it is shown, so a damaged or edited record cannot break the page.
 * "message is SentMessage" makes this a type guard: after the check,
 * TypeScript treats the value as a SentMessage.
 * @param message - A record loaded from storage, of unknown shape.
 */
export function isValidMessage(message: unknown): message is SentMessage {
  if (typeof message !== "object" || message === null) return false;
  const record = message as Record<string, unknown>;
  return (
    typeof record.id === "number" &&
    typeof record.name === "string" &&
    typeof record.text === "string" &&
    typeof record.time === "string"
  );
}

/**
 * Sends and reads messages in Firestore. Anyone can send a message;
 * only the owner can read or delete them (enforced by firestore.rules).
 */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./db";
import type { InboxMessage, Result } from "../types";

const messagesRef = collection(db, "messages");

/**
 * Sends a visitor's message to the owner's inbox. The time is set by
 * Firebase's server, so it cannot be faked; the rules reject any other time.
 * @param name - Up to 50 characters.
 * @param text - Up to 1000 characters.
 * @param email - Optional, so the owner can reply; left out when empty.
 */
export async function sendMessage(
  name: string,
  text: string,
  email = "",
): Promise<Result> {
  try {
    await addDoc(messagesRef, {
      name,
      text,
      time: serverTimestamp(),
      // Only store an email field when the visitor gave one
      ...(email ? { email } : {}),
    });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Your message could not be sent. Please try again.",
    };
  }
}

/**
 * Listens to the inbox, newest first. onChange runs straight away and again
 * whenever a message arrives or is deleted. Only works for the owner.
 * @returns A function that stops listening.
 */
export function watchInbox(
  onChange: (messages: InboxMessage[]) => void,
  onError: (error: string) => void,
): () => void {
  const newestFirst = query(messagesRef, orderBy("time", "desc"));

  return onSnapshot(
    newestFirst,
    (snapshot) => {
      onChange(
        snapshot.docs.map((message) => {
          // "estimate" gives a time for a message the server hasn't stamped yet
          const data = message.data({ serverTimestamps: "estimate" });
          return {
            id: message.id,
            name: data.name as string,
            text: data.text as string,
            time: (data.time as Timestamp).toDate().toISOString(),
            email: data.email as string | undefined,
          };
        }),
      );
    },
    () => onError("The inbox could not be loaded."),
  );
}

/**
 * Deletes one message from the inbox.
 * @param id - The message's Firestore id.
 */
export async function deleteMessage(id: string): Promise<Result> {
  try {
    await deleteDoc(doc(db, "messages", id));
    return { ok: true };
  } catch {
    return { ok: false, error: "The message could not be deleted." };
  }
}

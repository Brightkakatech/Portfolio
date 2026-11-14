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
} from "firebase/firestore";
import { db } from "./db";

const messagesRef = collection(db, "messages");

/**
 * Sends a visitor's message to the owner's inbox. The time is set by
 * Firebase's server, so it cannot be faked; the rules reject any other time.
 * @param {string} name - Up to 50 characters.
 * @param {string} text - Up to 1000 characters.
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function sendMessage(name, text) {
  try {
    await addDoc(messagesRef, { name, text, time: serverTimestamp() });
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
 * @param {(messages: Array<{id: string, name: string, text: string, time: string}>) => void} onChange
 * @param {(error: string) => void} onError
 * @returns {() => void} A function that stops listening.
 */
export function watchInbox(onChange, onError) {
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
            name: data.name,
            text: data.text,
            time: data.time.toDate().toISOString(),
          };
        }),
      );
    },
    () => onError("The inbox could not be loaded."),
  );
}

/**
 * Deletes one message from the inbox.
 * @param {string} id - The message's Firestore id.
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function deleteMessage(id) {
  try {
    await deleteDoc(doc(db, "messages", id));
    return { ok: true };
  } catch {
    return { ok: false, error: "The message could not be deleted." };
  }
}

/**
 * Reads and writes blog posts in Firestore. Everyone can read posts;
 * signed-in users with a verified email can publish; authors can delete
 * their own posts and the owner can delete any (enforced by firestore.rules).
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
import { auth } from "./firebase";
import { db } from "./db";

const postsRef = collection(db, "posts");

/**
 * Listens to all posts, newest first. onChange runs straight away and again
 * whenever a post is published or deleted, by anyone.
 * @param {(posts: Array<{id: string, title: string, content: string, date: string, authorId: string, authorName: string}>) => void} onChange
 * @param {(error: string) => void} onError
 * @returns {() => void} A function that stops listening.
 */
export function watchPosts(onChange, onError) {
  const newestFirst = query(postsRef, orderBy("date", "desc"));

  return onSnapshot(
    newestFirst,
    (snapshot) => {
      onChange(
        snapshot.docs.map((post) => {
          // "estimate" gives a date for a post the server hasn't stamped yet
          const data = post.data({ serverTimestamps: "estimate" });
          return {
            id: post.id,
            title: data.title,
            content: data.content,
            date: data.date.toDate().toISOString(),
            authorId: data.authorId,
            authorName: data.authorName,
          };
        }),
      );
    },
    () => onError("The posts could not be loaded."),
  );
}

/**
 * Publishes a post as the signed-in user. The date comes from Firebase's
 * server and the author from the sign-in, so neither can be faked.
 * @param {string} title - Up to 150 characters.
 * @param {string} content - Up to 10,000 characters.
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function publishPost(title, content) {
  const user = auth.currentUser;
  if (!user) return { ok: false, error: "Please sign in to write a post." };

  try {
    await addDoc(postsRef, {
      title,
      content,
      date: serverTimestamp(),
      authorId: user.uid,
      authorName: user.displayName,
    });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "The post could not be published. Please check your email is verified.",
    };
  }
}

/**
 * Deletes a post.
 * @param {string} id - The post's Firestore id.
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function deletePost(id) {
  try {
    await deleteDoc(doc(db, "posts", id));
    return { ok: true };
  } catch {
    return { ok: false, error: "The post could not be deleted." };
  }
}

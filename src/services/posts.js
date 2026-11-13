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
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "./firebase";
import { db } from "./db";

const postsRef = collection(db, "posts");
const newestFirst = query(postsRef, orderBy("date", "desc"));

/**
 * Turns a Firestore document into the plain post object the site uses.
 * Shared by watchPosts and fetchPosts so both return the same shape.
 * @param {import("firebase/firestore").QueryDocumentSnapshot} post
 */
function toPost(post) {
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
}

/**
 * Listens to all posts, newest first. onChange runs straight away and again
 * whenever a post is published or deleted, by anyone.
 * @param {(posts: Array<object>) => void} onChange
 * @param {(error: string) => void} onError
 * @returns {() => void} A function that stops listening.
 */
export function watchPosts(onChange, onError) {
  return onSnapshot(
    newestFirst,
    (snapshot) => onChange(snapshot.docs.map(toPost)),
    () => onError("The posts could not be loaded."),
  );
}

/**
 * Reads all posts once, newest first. Used by the site-wide search.
 * @returns {Promise<{ok: boolean, posts: Array<object>}>}
 */
export async function fetchPosts() {
  try {
    const snapshot = await getDocs(newestFirst);
    return { ok: true, posts: snapshot.docs.map(toPost) };
  } catch {
    return { ok: false, posts: [] };
  }
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

/**
 * The shapes of the data used across the site. Each interface is written
 * once here and imported wherever it is needed, so TypeScript can check
 * that every page, service and helper agrees on what the data looks like.
 */

/** A signed-in user, copied from Firebase into plain fields. */
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
}

/**
 * The result of an action that can fail with a message for the visitor.
 * It is a "union" of two shapes: success, or failure with an error message.
 * After checking result.ok, TypeScript knows which shape it is, so it can
 * be sure an error message exists whenever ok is false.
 */
export type Result = { ok: true } | { ok: false; error: string };

/** A blog post, as stored in Firestore. */
export interface Post {
  id: string;
  title: string;
  content: string;
  date: string; // ISO date string
  authorId: string;
  authorName: string;
}

/** A message in the owner's Inbox, as stored in Firestore. */
export interface InboxMessage {
  id: string;
  name: string;
  text: string;
  time: string; // ISO date string
}

/** A visitor's own copy of a message they sent, kept in their browser. */
export interface SentMessage {
  id: number;
  name: string;
  text: string;
  time: string; // ISO date string
}

/** A public repository from the GitHub API, reduced to the fields shown. */
export interface Repo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  updated: string; // ISO date string
}

/* ---------- Page content loaded from public/data/*.json ---------- */

/** public/data/about.json */
export interface AboutContent {
  photo: string;
  intro: string;
  story: string[];
  highlights: { title: string; text: string }[];
  interests: string[];
}

/** One item in public/data/contact.json */
export interface ContactLink {
  label: string;
  text: string;
  url: string;
}

/** One item in public/data/education.json */
export interface EducationItem {
  qualification: string;
  institution: string;
  location: string;
  years: string;
  details?: string[]; // optional: not every qualification lists details
}

/** One job in the "experience" list of public/data/knowledge.json */
export interface Job {
  role: string;
  organisation: string;
  location: string;
  years: string;
  points: string[];
}

/** One group in the "skillGroups" list of public/data/knowledge.json */
export interface SkillGroup {
  category: string;
  items: string[];
}

/** public/data/knowledge.json */
export interface Knowledge {
  skillGroups: SkillGroup[];
  experience: Job[];
}

/** One item in public/data/gallery.json */
export interface GalleryPhoto {
  file: string;
  caption: string;
}

/** One item in public/data/videos.json */
export interface Video {
  type: string;
  file: string;
  title: string;
  description?: string;
}

/* ---------- Site-wide search ---------- */

/** One searchable piece of content. */
export interface SearchEntry {
  section: string;
  title: string;
  text: string;
  link: string;
  external?: boolean; // true for links that leave the site (GitHub)
}

/** A search match, with a short extract around the matched words. */
export interface SearchResult extends SearchEntry {
  snippet: string;
}

/** A short success or error message shown under a form. */
export interface Notice {
  type: "success" | "error";
  text: string;
}

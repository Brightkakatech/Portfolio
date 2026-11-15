import { describe, expect, it } from "vitest";
import { filterPosts, listAuthors } from "./filterPosts";

// A few small example posts, standing in for posts loaded from Firestore
const posts = [
  { title: "Learning React", content: "Hooks and state", authorName: "Bright" },
  {
    title: "Firebase rules",
    content: "Securing the Inbox",
    authorName: "Bright",
  },
  {
    title: "My first post",
    content: "Hello from a visitor",
    authorName: "Ada",
  },
];

describe("filterPosts", () => {
  it("returns every post when there is no search and all authors are chosen", () => {
    expect(filterPosts(posts, "", "all")).toHaveLength(3);
  });

  it("finds posts by a word in the title", () => {
    const result = filterPosts(posts, "react", "all");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Learning React");
  });

  it("finds posts by a word in the text", () => {
    expect(filterPosts(posts, "inbox", "all")[0].title).toBe("Firebase rules");
  });

  it("ignores capital letters and extra spaces", () => {
    expect(filterPosts(posts, "  FIREBASE ", "all")).toHaveLength(1);
  });

  it("shows only the chosen author's posts", () => {
    const result = filterPosts(posts, "", "Ada");
    expect(result).toHaveLength(1);
    expect(result[0].authorName).toBe("Ada");
  });

  it("combines the search and the author filter", () => {
    expect(filterPosts(posts, "react", "Ada")).toHaveLength(0);
    expect(filterPosts(posts, "react", "Bright")).toHaveLength(1);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterPosts(posts, "xyzxyz", "all")).toEqual([]);
  });
});

describe("listAuthors", () => {
  it("lists each author once, in alphabetical order", () => {
    expect(listAuthors(posts)).toEqual(["Ada", "Bright"]);
  });

  it("returns an empty list when there are no posts", () => {
    expect(listAuthors([])).toEqual([]);
  });
});

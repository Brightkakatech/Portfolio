import { describe, expect, it } from "vitest";
import { buildSearchIndex, makeSnippet, searchSite } from "./searchSite";

// Small example content in the same shape as the JSON files and APIs
const index = buildSearchIndex({
  education: [
    {
      qualification: "MSc in Software Engineering",
      institution: "University of Limerick",
      location: "Limerick, Ireland",
      years: "2026 – 2027",
    },
  ],
  knowledge: {
    skillGroups: [{ category: "Web Development", items: ["React", "CSS"] }],
    experience: [
      {
        role: "System Administrator",
        organisation: "Pavic Homes Limited",
        location: "Southampton, United Kingdom",
        years: "2023 – Present",
        points: ["Administers Active Directory and Azure accounts."],
      },
    ],
  },
  posts: [{ title: "Learning React", content: "Hooks and state" }],
  repos: [
    {
      name: "zero-trust-identity-lab",
      description: "Zero Trust lab on Microsoft Entra ID",
      url: "https://github.com/Brightkakatech/zero-trust-identity-lab",
    },
  ],
});

describe("buildSearchIndex", () => {
  it("creates one entry per piece of content", () => {
    // 1 education + 1 skill group + 1 job + 1 post + 1 repository
    expect(index).toHaveLength(5);
  });

  it("works when some sources failed to load", () => {
    expect(buildSearchIndex({})).toEqual([]);
  });

  it("marks GitHub projects as external links", () => {
    const repo = index.find((entry) => entry.section === "GitHub projects");
    expect(repo?.external).toBe(true);
  });
});

describe("searchSite", () => {
  it("finds a word in every section that contains it", () => {
    const sections = searchSite(index, "react").map((result) => result.section);
    expect(sections).toEqual(["Skills", "Blog"]);
  });

  it("ignores capital letters", () => {
    expect(searchSite(index, "LIMERICK")).toHaveLength(1);
  });

  it("returns nothing for an empty search", () => {
    expect(searchSite(index, "   ")).toEqual([]);
  });

  it("adds a snippet around the match", () => {
    const [result] = searchSite(index, "azure");
    expect(result.section).toBe("Experience");
    expect(result.snippet).toContain("Azure");
  });
});

describe("makeSnippet", () => {
  it("returns short text unchanged", () => {
    expect(makeSnippet("Hello world", "world")).toBe("Hello world");
  });

  it("shortens long text around the match, with … at the cut ends", () => {
    const text = "a".repeat(200) + " needle " + "b".repeat(200);
    const snippet = makeSnippet(text, "needle");
    expect(snippet).toContain("needle");
    expect(snippet.startsWith("…")).toBe(true);
    expect(snippet.endsWith("…")).toBe(true);
  });
});

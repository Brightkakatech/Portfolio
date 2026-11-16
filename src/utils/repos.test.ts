import { describe, expect, it } from "vitest";
import { filterByLanguage, listLanguages } from "./repos";

const repos = [
  { name: "lab-a", language: "PowerShell" },
  { name: "portfolio", language: "TypeScript" },
  { name: "lab-b", language: "PowerShell" },
  { name: "profile", language: null },
];

describe("listLanguages", () => {
  it("lists each language once, A to Z, skipping projects with none", () => {
    expect(listLanguages(repos)).toEqual(["PowerShell", "TypeScript"]);
  });
});

describe("filterByLanguage", () => {
  it("returns every project for 'all'", () => {
    expect(filterByLanguage(repos, "all")).toHaveLength(4);
  });

  it("returns only the projects in the chosen language", () => {
    const names = filterByLanguage(repos, "PowerShell").map(
      (repo) => repo.name,
    );
    expect(names).toEqual(["lab-a", "lab-b"]);
  });
});

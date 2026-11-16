import { describe, expect, it } from "vitest";
import { readingTime } from "./readingTime";

describe("readingTime", () => {
  it("shows at least one minute for short texts", () => {
    expect(readingTime("Hello world")).toBe("1 min read");
    expect(readingTime("")).toBe("1 min read");
  });

  it("rounds to the nearest minute at about 200 words a minute", () => {
    expect(readingTime("word ".repeat(400))).toBe("2 min read");
    expect(readingTime("word ".repeat(700))).toBe("4 min read");
  });
});

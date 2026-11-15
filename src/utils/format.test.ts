import { describe, expect, it } from "vitest";
import { formatDate, formatTime } from "./format";

describe("formatDate", () => {
  it("writes the date in Irish English, e.g. 28 September 2026", () => {
    // Midday UTC, so the date is the same in any nearby time zone
    expect(formatDate("2026-09-28T12:00:00Z")).toBe("28 September 2026");
  });
});

describe("formatTime", () => {
  it("shows the day, a short month and a time", () => {
    const text = formatTime("2026-09-28T12:00:00Z");
    expect(text).toContain("28");
    expect(text).toContain("Sept");
    // The hour depends on the computer's time zone, so only its shape is checked
    expect(text).toMatch(/\d{2}:\d{2}/);
  });
});

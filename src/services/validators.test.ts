import { describe, expect, it } from "vitest";
import { isValidMessage } from "./validators";

describe("isValidMessage", () => {
  it("accepts a well-formed message", () => {
    expect(
      isValidMessage({
        id: 1,
        name: "Ada",
        text: "Hello",
        time: "2026-11-14T12:00:00Z",
      }),
    ).toBe(true);
  });

  it("rejects a message with a missing field", () => {
    expect(isValidMessage({ id: 1, name: "Ada", text: "Hello" })).toBe(false);
  });

  it("rejects a message with a field of the wrong type", () => {
    expect(
      isValidMessage({ id: "1", name: "Ada", text: "Hello", time: "now" }),
    ).toBe(false);
  });

  it("rejects values that are not objects at all", () => {
    expect(isValidMessage(null)).toBe(false);
    expect(isValidMessage("hello")).toBe(false);
    expect(isValidMessage(42)).toBe(false);
  });
});

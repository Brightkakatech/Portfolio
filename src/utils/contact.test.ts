import { describe, expect, it } from "vitest";
import { buildReplyLink, isValidEmail } from "./contact";

describe("isValidEmail", () => {
  it("accepts ordinary email addresses", () => {
    expect(isValidEmail("ada@example.com")).toBe(true);
    expect(isValidEmail("26059274@studentmail.ul.ie")).toBe(true);
  });

  it("ignores spaces at either end", () => {
    expect(isValidEmail("  ada@example.com ")).toBe(true);
  });

  it("rejects text that is not an email address", () => {
    expect(isValidEmail("ada")).toBe(false);
    expect(isValidEmail("ada@example")).toBe(false);
    expect(isValidEmail("ada @example.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("buildReplyLink", () => {
  const message = {
    id: "abc",
    name: "Ada",
    text: "Hello Bright!\nAre you available?",
    time: "2026-11-15T12:00:00Z",
    email: "ada@example.com",
  };

  it("addresses the email to the visitor", () => {
    expect(buildReplyLink(message)?.startsWith("mailto:ada@example.com?")).toBe(
      true,
    );
  });

  it("includes the subject and quotes the original message", () => {
    const link = buildReplyLink(message) ?? "";
    const body = decodeURIComponent(link.split("&body=")[1]);
    expect(decodeURIComponent(link)).toContain(
      "Re: your message on my portfolio",
    );
    expect(body).toContain("Hi Ada,");
    expect(body).toContain("> Hello Bright!");
    expect(body).toContain("> Are you available?");
  });

  it("returns null when the visitor left no email address", () => {
    expect(buildReplyLink({ ...message, email: undefined })).toBe(null);
  });
});

import { describe, expect, it } from "vitest";
import {
  describeDifference,
  describeVisitorTime,
  greetingFor,
  handAngles,
  hourIn,
  offsetMinutes,
  timeIn,
  timeZoneCity,
} from "./clock";

describe("greetingFor", () => {
  it("matches the time of day", () => {
    expect(greetingFor(2)).toBe("Good night");
    expect(greetingFor(9)).toBe("Good morning");
    expect(greetingFor(14)).toBe("Good afternoon");
    expect(greetingFor(20)).toBe("Good evening");
  });
});

describe("offsetMinutes", () => {
  const winter = new Date("2026-01-15T12:00:00Z");
  const summer = new Date("2026-07-15T12:00:00Z");

  it("knows Ireland moves to summer time", () => {
    expect(offsetMinutes("Europe/Dublin", winter)).toBe(0);
    expect(offsetMinutes("Europe/Dublin", summer)).toBe(60);
  });

  it("works for zones behind UTC and half-hour zones", () => {
    expect(offsetMinutes("America/New_York", winter)).toBe(-300);
    expect(offsetMinutes("Asia/Kolkata", winter)).toBe(330);
  });
});

describe("hourIn", () => {
  it("gives the hour in the chosen time zone", () => {
    const noonUtc = new Date("2026-01-15T12:00:00Z");
    expect(hourIn("Europe/Dublin", noonUtc)).toBe(12);
    expect(hourIn("Africa/Lagos", noonUtc)).toBe(13);
  });
});

describe("describeDifference", () => {
  it("describes the gap in plain words", () => {
    expect(describeDifference(0)).toBe("Same time as you.");
    expect(describeDifference(60)).toBe("Limerick is 1 hour ahead of you.");
    expect(describeDifference(-300)).toBe("Limerick is 5 hours behind you.");
    expect(describeDifference(-330)).toBe("Limerick is 5.5 hours behind you.");
  });
});

describe("timeIn", () => {
  it("reads hours, minutes and seconds in the chosen zone", () => {
    const moment = new Date("2026-07-15T08:05:09Z");
    expect(timeIn("Europe/Dublin", moment)).toEqual({
      hour: 9,
      minute: 5,
      second: 9,
    });
  });
});

describe("handAngles", () => {
  it("points the hands like a real clock", () => {
    expect(handAngles({ hour: 0, minute: 0, second: 0 })).toEqual({
      hour: 0,
      minute: 0,
      second: 0,
    });
    // 15:30:00 -> hour hand halfway between 3 and 4, minute hand on 6
    expect(handAngles({ hour: 15, minute: 30, second: 0 })).toEqual({
      hour: 105,
      minute: 180,
      second: 0,
    });
  });
});

describe("timeZoneCity", () => {
  it("gives the city in plain words", () => {
    expect(timeZoneCity("Africa/Lagos")).toBe("Lagos");
    expect(timeZoneCity("America/Argentina/Buenos_Aires")).toBe("Buenos Aires");
  });

  it("gives nothing for zones without a city", () => {
    expect(timeZoneCity("UTC")).toBe("");
    expect(timeZoneCity("Etc/GMT+1")).toBe("");
  });
});

describe("describeVisitorTime", () => {
  const moment = new Date("2026-11-16T23:46:00Z");

  it("shows the visitor's time and time zone", () => {
    expect(describeVisitorTime("Africa/Lagos", moment)).toBe(
      "Your time: 00:46 · Lagos time zone",
    );
    expect(describeVisitorTime("America/New_York", moment)).toBe(
      "Your time: 18:46 · New York time zone",
    );
  });

  it("leaves out the city when the zone has none", () => {
    expect(describeVisitorTime("UTC", moment)).toBe("Your time: 23:46");
  });
});

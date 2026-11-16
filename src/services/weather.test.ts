import { describe, expect, it } from "vitest";
import { describeWeather } from "./weather";

describe("describeWeather", () => {
  it("names common Irish weather", () => {
    expect(describeWeather(3).label).toBe("Overcast");
    expect(describeWeather(61).label).toBe("Light rain");
    expect(describeWeather(63).label).toBe("Rain");
    expect(describeWeather(45).label).toBe("Fog");
  });

  it("shows a moon on clear nights", () => {
    expect(describeWeather(0, true).icon).toBe("☀️");
    expect(describeWeather(0, false).icon).toBe("🌙");
  });

  it("has a safe fallback for codes it doesn't know", () => {
    expect(describeWeather(999).label).toBe("Unsettled");
  });
});

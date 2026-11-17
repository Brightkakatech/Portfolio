/**
 * Helpers for the live clock on Home. The clock shows the time where I live
 * (Limerick, Ireland), a greeting that matches it, and how far ahead or
 * behind the visitor's own time that is.
 */

/** My time zone. Ireland switches between GMT and summer time automatically. */
export const HOME_TIME_ZONE = "Europe/Dublin";

/** A greeting that suits the hour (0 to 23). */
export function greetingFor(hour: number): string {
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** The clock time in a time zone at a given moment. */
export interface ClockTime {
  hour: number; // 0 to 23
  minute: number;
  second: number;
}

/** Reads the hour, minute and second shown on clocks in a time zone. */
export function timeIn(timeZone: string, date: Date): ClockTime {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hourCycle: "h23",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { hour: get("hour"), minute: get("minute"), second: get("second") };
}

/** The hour (0 to 23) in a time zone at a given moment. */
export function hourIn(timeZone: string, date: Date): number {
  return timeIn(timeZone, date).hour;
}

/**
 * How far each hand of an analogue clock is turned, in degrees clockwise
 * from 12. The hour and minute hands creep forward between marks, as on a
 * real clock: at 3:30 the hour hand sits halfway between 3 and 4.
 */
export function handAngles({ hour, minute, second }: ClockTime) {
  return {
    hour: (hour % 12) * 30 + minute * 0.5, // 360° / 12 hours; 30° / 60 min
    minute: minute * 6 + second * 0.1, // 360° / 60 minutes; 6° / 60 s
    second: second * 6, // 360° / 60 seconds
  };
}

/**
 * How many minutes a time zone is ahead of UTC at a given moment
 * (negative when behind), e.g. 60 for Dublin in summer.
 * It reads the clock time in that zone and compares it with UTC.
 */
export function offsetMinutes(timeZone: string, date: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).formatToParts(date);
  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
  );
  const wholeMinute = Math.floor(date.getTime() / 60000) * 60000;
  return Math.round((asUtc - wholeMinute) / 60000);
}

/**
 * A short sentence comparing my time with the visitor's,
 * e.g. "Limerick is 5 hours ahead of you."
 * @param difference - My offset minus the visitor's offset, in minutes.
 */
export function describeDifference(difference: number): string {
  if (difference === 0) return "Same time as you.";
  const hours = Math.abs(difference) / 60;
  // Some places are 30 or 45 minutes off a whole hour, e.g. India
  const amount = Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
  const unit = hours === 1 ? "hour" : "hours";
  const direction = difference > 0 ? "ahead of" : "behind";
  return `Limerick is ${amount} ${unit} ${direction} you.`;
}

/**
 * The city in a time-zone name, in plain words,
 * e.g. "Africa/Lagos" -> "Lagos", "America/Argentina/Buenos_Aires" ->
 * "Buenos Aires". Zones without a city (e.g. "UTC") give "".
 */
export function timeZoneCity(timeZone: string): string {
  if (!timeZone.includes("/") || timeZone.startsWith("Etc/")) return "";
  const city = timeZone.split("/").pop() ?? "";
  return city.replace(/_/g, " ");
}

/**
 * The visitor's own clock time and time zone, e.g.
 * "Your time: 00:46 · Lagos time zone". The city is the time zone's main
 * city (all of Nigeria uses Lagos), which is why it says "time zone".
 */
export function describeVisitorTime(timeZone: string, date: Date): string {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
  const city = timeZoneCity(timeZone);
  return city ? `Your time: ${time} · ${city} time zone` : `Your time: ${time}`;
}

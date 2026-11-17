import { useEffect, useState } from "react";
import {
  describeDifference,
  describeVisitorTime,
  greetingFor,
  handAngles,
  HOME_TIME_ZONE,
  offsetMinutes,
  timeIn,
} from "../utils/clock";
import {
  describeWeather,
  fetchWeather,
  type WeatherResult,
} from "../services/weather";

// The visitor's own time zone, as set on their device
const VISITOR_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: HOME_TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const WEATHER_REFRESH_MS = 15 * 60 * 1000; // Open-Meteo updates every 15 min

// The 60 marks around the clock face; every fifth one is an hour mark
const MARKS = Array.from({ length: 60 }, (_, index) => index);

/**
 * "Right now in Limerick" card on Home: an analogue clock showing my local
 * time, the date, a greeting, how far ahead or behind the visitor that is,
 * the visitor's own time and time zone (read from their device, so no
 * permission or location data is needed), and the current weather from the
 * Open-Meteo API.
 * The clock ticks once a second; the weather refreshes every 15 minutes.
 * Both stop when the visitor leaves Home.
 */
function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState<WeatherResult | null>(null); // null while loading

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false; // ignore answers that arrive after leaving Home
    function load() {
      fetchWeather().then((result) => {
        if (!cancelled) setWeather(result);
      });
    }
    load();
    const timer = window.setInterval(load, WEATHER_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const time = timeIn(HOME_TIME_ZONE, now);
  const angles = handAngles(time);
  const spoken = `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
  const difference =
    offsetMinutes(HOME_TIME_ZONE, now) - offsetMinutes(VISITOR_TIME_ZONE, now);

  return (
    <aside className="live-clock" aria-label="Right now in Limerick">
      <p className="clock-greeting">
        {greetingFor(time.hour)} from Limerick, Ireland
      </p>

      {/* Analogue clock drawn in SVG on a 200 x 200 grid with its centre
          at 100,100. Each hand is a line pointing at 12, turned by its angle. */}
      <svg
        className="clock-face"
        viewBox="0 0 200 200"
        role="img"
        aria-label={`Time in Limerick: ${spoken}`}
      >
        <circle className="face" cx="100" cy="100" r="95" />
        {MARKS.map((mark) => (
          <line
            key={mark}
            className={mark % 5 === 0 ? "mark hour-mark" : "mark"}
            x1="100"
            y1={mark % 5 === 0 ? 12 : 10}
            x2="100"
            y2={mark % 5 === 0 ? 26 : 16}
            transform={`rotate(${mark * 6} 100 100)`}
          />
        ))}
        <line
          className="hand hour-hand"
          x1="100"
          y1="100"
          x2="100"
          y2="52"
          transform={`rotate(${angles.hour} 100 100)`}
        />
        <line
          className="hand minute-hand"
          x1="100"
          y1="100"
          x2="100"
          y2="28"
          transform={`rotate(${angles.minute} 100 100)`}
        />
        <line
          className="hand second-hand"
          x1="100"
          y1="115"
          x2="100"
          y2="22"
          transform={`rotate(${angles.second} 100 100)`}
        />
        <circle className="hub" cx="100" cy="100" r="5" />
      </svg>

      <p className="clock-date">
        <time dateTime={now.toISOString()}>{dateFormat.format(now)}</time>
      </p>
      <p className="clock-diff">{describeDifference(difference)}</p>
      <p className="clock-diff">
        {describeVisitorTime(VISITOR_TIME_ZONE, now)}
      </p>

      <div className="clock-weather">
        {weather === null && <p>Checking the weather…</p>}
        {weather && !weather.ok && <p>{weather.error}</p>}
        {weather?.ok && <WeatherLine {...weather.weather} />}
      </div>
    </aside>
  );
}

/** One line of weather: icon, condition, temperature and wind. */
function WeatherLine({
  code,
  isDay,
  temperature,
  wind,
}: {
  code: number;
  isDay: boolean;
  temperature: number;
  wind: number;
}) {
  const { label, icon } = describeWeather(code, isDay);
  return (
    <>
      <p className="weather-main">
        <span className="weather-icon" aria-hidden="true">
          {icon}
        </span>{" "}
        <strong>{temperature}°C</strong> · {label}
      </p>
      <p className="weather-wind">Wind {wind} km/h</p>
    </>
  );
}

export default LiveClock;

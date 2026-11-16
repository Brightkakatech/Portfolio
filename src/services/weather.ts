/**
 * Current weather in Limerick from Open-Meteo (https://open-meteo.com),
 * a free weather API that needs no key or sign-up. Each call fetches the
 * latest temperature, wind and condition code.
 */

// Limerick, Ireland
const LATITUDE = 52.66;
const LONGITUDE = -8.63;

const URL =
  "https://api.open-meteo.com/v1/forecast" +
  `?latitude=${LATITUDE}&longitude=${LONGITUDE}` +
  "&current=temperature_2m,weather_code,wind_speed_10m,is_day" +
  "&timezone=Europe%2FDublin";

/** The weather details the clock card shows. */
export interface Weather {
  temperature: number; // °C
  wind: number; // km/h
  code: number; // WMO weather code, see describeWeather()
  isDay: boolean;
}

/** What fetchWeather returns: the weather, or an error message. */
export type WeatherResult =
  { ok: true; weather: Weather } | { ok: false; error: string };

/** The part of Open-Meteo's answer that the site uses. */
interface OpenMeteoAnswer {
  current?: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number; // 1 in daylight, 0 at night
  };
}

/** Fetches the current weather in Limerick. Never throws. */
export async function fetchWeather(): Promise<WeatherResult> {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const answer = (await response.json()) as OpenMeteoAnswer;
    if (!answer.current) throw new Error("No current weather in the answer");
    return {
      ok: true,
      weather: {
        temperature: Math.round(answer.current.temperature_2m),
        wind: Math.round(answer.current.wind_speed_10m),
        code: answer.current.weather_code,
        isDay: answer.current.is_day === 1,
      },
    };
  } catch {
    return { ok: false, error: "Weather is unavailable right now." };
  }
}

/**
 * Turns a WMO weather code (the international standard Open-Meteo uses)
 * into words and an icon, e.g. 61 -> "Light rain" 🌦️.
 * @param isDay - Shows a moon instead of a sun for clear nights.
 */
export function describeWeather(
  code: number,
  isDay = true,
): { label: string; icon: string } {
  if (code === 0) return { label: "Clear sky", icon: isDay ? "☀️" : "🌙" };
  if (code <= 2) return { label: "Partly cloudy", icon: isDay ? "⛅" : "☁️" };
  if (code === 3) return { label: "Overcast", icon: "☁️" };
  if (code === 45 || code === 48) return { label: "Fog", icon: "🌫️" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", icon: "🌦️" };
  if (code === 61 || code === 80) return { label: "Light rain", icon: "🌦️" };
  if ((code >= 63 && code <= 67) || code === 81 || code === 82)
    return { label: "Rain", icon: "🌧️" };
  if ((code >= 71 && code <= 77) || code === 85 || code === 86)
    return { label: "Snow", icon: "🌨️" };
  if (code >= 95 && code <= 99) return { label: "Thunderstorm", icon: "⛈️" };
  return { label: "Unsettled", icon: "🌥️" };
}

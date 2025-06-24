import { Time } from "../types";

/**
 * Returns a Date object representing tomorrow at midnight (00:00).
 */
export const getTomorrowMidnight = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * Pads a number with a leading zero if necessary (e.g., 3 → "03").
 */
export const pad = (n: number): string => n.toString().padStart(2, "0");

/**
 * Parses a time string like "12:30 PM" into a Time object.
 */
export const parseTime = (timeStr: string): Time => {
  const [time, ampm] = timeStr.trim().split(" ");
  const [hourStr, minuteStr] = time.split(":");
  return {
    hour: parseInt(hourStr, 10),
    minute: parseInt(minuteStr, 10),
    ampm: ampm as "AM" | "PM",
  };
};

/**
 * Converts a Time object to the number of minutes since midnight.
 */
export const timeToMinutes = (t: Time): number => {
  let hour24 = t.hour % 12;
  if (t.ampm === "PM") hour24 += 12;
  return hour24 * 60 + t.minute;
};

/**
 * Converts a number of minutes since midnight into a Time object.
 */
export const minutesToTime = (mins: number): Time => {
  const total = (mins + 24 * 60) % (24 * 60); // normalize negative values
  const hour24 = Math.floor(total / 60);
  const minute = total % 60;
  const ampm = hour24 >= 12 ? "PM" : "AM";
  let hour = hour24 % 12;
  if (hour === 0) hour = 12;
  return { hour, minute, ampm };
};

export const formatTime = (time?: string) => {
  return typeof time === "string" && time.trim() !== "" ? time : "--";
};

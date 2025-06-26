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
 * Converts a Time object to the number of minutes since midnight.
 */
export const timeToMinutes = (t: Time): number => {
  let hour24 = t.hour % 12;
  if (t.ampm === "PM") hour24 += 12;
  return hour24 * 60 + t.minute;
};

export const formatTime = (time?: string) => {
  return typeof time === "string" && time.trim() !== "" ? time : "--";
};

export const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export const parseTime = (str: string): Time => {
  const [timePart, ampm] = str.split(" ");
  const [hourStr, minuteStr] = timePart.split(":");
  return {
    hour: parseInt(hourStr, 10),
    minute: parseInt(minuteStr, 10),
    ampm: ampm as "AM" | "PM",
  };
};

export const minutesToTime = (minutes: number): Time => {
  const mins = minutes % (24 * 60);
  const hour24 = Math.floor(mins / 60);
  const minute = mins % 60;
  const ampm = hour24 >= 12 ? "PM" : "AM";
  const hour = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return { hour, minute, ampm };
};
export const MIN_TIME = 30;
export const MAX_TIME = 23 * 60 + 59;
export const isValidTime = (time: Time): boolean => {
  const mins = getMinutes(time);
  return mins >= MIN_TIME && mins <= MAX_TIME;
};
// Converts 12-hour time to total minutes
export const getMinutes = (time: Time): number => {
  let hour = time.hour % 12;
  if (time.ampm === "PM") hour += 12;
  return hour * 60 + time.minute;
};
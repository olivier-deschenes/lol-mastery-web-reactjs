import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ky from "ky";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  timeout: false,
  retry: 0,
  credentials: "include",
});

export const formatter = Intl.NumberFormat("en", { notation: "compact" });

export function timeago(
  input: Date | string,
  locale: string | string[] = navigator?.language || "en-US"
): string {
  const date = typeof input === "string" ? new Date(input) : input;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // If future date, return the formatted date
  if (diffMs < 0) {
    return new Intl.DateTimeFormat(locale).format(date);
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours <= 1) {
    const value = -diffMinutes;
    const absNumStr = String(Math.abs(value));
    return absNumStr + "m";
  } else if (diffDays <= 1) {
    const value = -diffHours;
    const absNumStr = String(Math.abs(value));
    return absNumStr + "h";
  } else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
}

export const formatSeconds = (secs: number) => {
  const secInHour = 3600;
  const secInMinute = 60;

  const h = Math.floor(secs / secInHour);
  const m = Math.floor((secs % secInHour) / secInMinute);
  const s = secs % secInMinute;

  const parts = [];

  if (h) parts.push(h + "h");
  if (m) parts.push(m + "m");
  if (s || parts.length === 0) parts.push(s + "s");

  return parts.join(" ");
};

export const formatNumberToString = (n: number) => n.toLocaleString("en-US");

export const toTitleCase = (s: string) => {
  return s
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getInitials = (user: string) => {
  return user
    .split(" ")
    .map((p) => p.at(0)?.toUpperCase())
    .join();
};

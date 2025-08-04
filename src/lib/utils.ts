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
});

export const formatter = Intl.NumberFormat("en", { notation: "compact" });

import ky from "ky";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  timeout: false,
  retry: 0,
});

export const formatter = Intl.NumberFormat("en", { notation: "compact" });

export function generateBrightColor() {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
  }
  // Ensure brightness by setting the minimum value of the red component to 128
  if (parseInt(color.substring(1, 3), 16) < 128) {
    color = "#80" + color.substring(3);
  }
  return color;
}

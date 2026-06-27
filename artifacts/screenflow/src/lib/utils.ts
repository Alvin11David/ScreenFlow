import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOS(): "windows" | "mac" | "linux" {
  if (typeof navigator === "undefined") return "mac";
  const platform = navigator.userAgent.toLowerCase();
  if (platform.includes("win")) return "windows";
  if (platform.includes("mac")) return "mac";
  return "linux";
}

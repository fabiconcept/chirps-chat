import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import os from "os";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function detectOS() {
    // Check if we're in a browser environment
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        const ua = navigator.userAgent.toLowerCase();

        if (ua.includes("windows")) return "windows";
        if (ua.includes("mac")) {
            // Distinguish between iOS and macOS
            if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "ios";
            return "macos";
        }
        if (ua.includes("android")) return "android";
        if (ua.includes("linux")) return "linux";

        return "unknown";
    }

    // Otherwise we're in a Node.js (server) environment
    try {
        const platform = os.platform();

        if (platform === "win32") return "windows";
        if (platform === "darwin") return "macos";
        if (platform === "linux") return "linux";
        return "unknown";
    } catch {
        return "unknown";
    }
}

export function formatNumber(num: number, decimals: number = 2): string {
  if (num < 1000) {
    return num.toString();
  }

  const units = [
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ];

  for (const unit of units) {
    if (num >= unit.value) {
      const formatted = num / unit.value;
      
      // Remove unnecessary decimal places
      const rounded = Math.round(formatted * Math.pow(10, decimals)) / Math.pow(10, decimals);
      
      // Convert to string and remove trailing zeros
      const str = rounded.toFixed(decimals).replace(/\.?0+$/, '');
      
      return str + unit.symbol;
    }
  }

  return num.toString();
}
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
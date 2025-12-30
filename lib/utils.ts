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

export function formatNumber(num: number, decimals: number = 1, long: boolean = false): string {
  num = Number(num);
  if (num < 1000) {
    return num.toString();
  }

  // Because I can 😂😂😂😂😂
  const units = [
    { value: 1e99, symbol: 'Tg', long: 'Tresvigintillion' },
    { value: 1e96, symbol: 'Dv', long: 'Duovigintillion' },
    { value: 1e93, symbol: 'Uv', long: 'Unvigintillion' },
    { value: 1e90, symbol: 'Vg', long: 'Vigintillion' },
    { value: 1e87, symbol: 'Nd', long: 'Novemdecillion' },
    { value: 1e84, symbol: 'Od', long: 'Octodecillion' },
    { value: 1e81, symbol: 'Sd', long: 'Septendecillion' },
    { value: 1e78, symbol: 'Sxd', long: 'Sexdecillion' },
    { value: 1e75, symbol: 'Qid', long: 'Quindecillion' },
    { value: 1e72, symbol: 'Qad', long: 'Quattuordecillion' },
    { value: 1e69, symbol: 'Td', long: 'Tredecillion' },
    { value: 1e66, symbol: 'Dd', long: 'Duodecillion' },
    { value: 1e63, symbol: 'Ud', long: 'Undecillion' },
    { value: 1e60, symbol: 'D', long: 'Decillion' },
    { value: 1e57, symbol: 'N', long: 'Nonillion' },
    { value: 1e54, symbol: 'O', long: 'Octillion' },
    { value: 1e51, symbol: 'Sp', long: 'Septillion' },
    { value: 1e48, symbol: 'Sx', long: 'Sextillion' },
    { value: 1e45, symbol: 'Qi', long: 'Quintillion' },
    { value: 1e42, symbol: 'Qa', long: 'Quadrillion' },
    { value: 1e39, symbol: 'Tn', long: 'Trillion' },
    { value: 1e36, symbol: 'Un', long: 'Undecillion' },
    { value: 1e33, symbol: 'Dc', long: 'Decillion' },
    { value: 1e30, symbol: 'No', long: 'Nonillion' },
    { value: 1e27, symbol: 'Oc', long: 'Octillion' },
    { value: 1e24, symbol: 'Sp', long: 'Septillion' },
    { value: 1e21, symbol: 'Sx', long: 'Sextillion' },
    { value: 1e18, symbol: 'Qi', long: 'Quintillion' },
    { value: 1e15, symbol: 'Q', long: 'Quadrillion' },
    { value: 1e12, symbol: 'T', long: 'Trillion' },
    { value: 1e9, symbol: 'B', long: 'Billion' },
    { value: 1e6, symbol: 'M', long: 'Million' },
    { value: 1e3, symbol: 'K', long: 'Thousand' },
];

  for (const unit of units) {
    if (num >= unit.value) {
      const formatted = num / unit.value;

      // Remove unnecessary decimal places
      const rounded = Math.round(formatted * Math.pow(10, decimals)) / Math.pow(10, decimals);

      // Convert to string and remove trailing zeros
      const str = rounded.toFixed(decimals).replace(/\.?0+$/, '');

      return long ? str + ' ' + unit.long : str + unit.symbol;
    }
  }

  return num.toString();
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      textArea.remove()
      return successful
    }
  } catch (error) {
    console.error('Failed to copy text:', error)
    return false
  }
}

// Average ~80-100 chars per line for text-lg
const getCharLimit = (maxLines: number) => {
  const charsPerLine = 100
  return maxLines * charsPerLine
}

// Truncate text intelligently
export const getTruncatedText = (content: string, maxLines: number) => {
  const charLimit = getCharLimit(maxLines)

  if (content.length <= charLimit) {
    return { text: content, isTruncated: false }
  }

  // Find a good breaking point (space, newline, or punctuation)
  let truncateAt = charLimit
  const breakChars = [' ', '\n', '.', ',', '!', '?', ';']

  // Look backwards from limit to find a natural break
  for (let i = charLimit; i > charLimit - 50 && i > 0; i--) {
    if (breakChars.includes(content[i])) {
      truncateAt = i
      break
    }
  }

  return {
    text: content.substring(0, truncateAt).trim() + '...',
    isTruncated: true
  }
}

export function updateSearchParam(key: string, value: string) {
  const url = new URL(window.location.toString());

  if (url.searchParams.get(key) === value) {
    return null;
  }
  url.searchParams.set(key, value);

  window.history.pushState({}, "", url.toString());
}

export function removeSearchParam(key: string) {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);

  window.history.pushState({}, "", url.toString());
}

export function getRelativeTime(date: Date | string, withTime: boolean = false): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Just now (less than 1 minute)
  if (diffInSeconds < 60) {
    return 'now';
  }

  // Minutes ago (less than 1 hour)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  // Hours ago (less than 24 hours)
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  // Yesterday
  if (diffInDays === 1) {
    return !withTime ? 'Yesterday' : `Yesterday, ${targetDate.getHours()}:${targetDate.getMinutes()}:${targetDate.getSeconds()}`;
  }

  // Days of week (less than 7 days)
  if (diffInDays < 7) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return !withTime ? `${days[targetDate.getDay()]}` : `${days[targetDate.getDay()]}, ${targetDate.getHours()}:${targetDate.getMinutes()}:${targetDate.getSeconds()}`;
  }

  // Full date for older messages
  const day = targetDate.getDate().toString().padStart(2, '0');
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const year = targetDate.getFullYear();
  return withTime ? `${day}/${month}/${year} ${targetDate.getHours()}:${targetDate.getMinutes()}:${targetDate.getSeconds()}` : `${day}/${month}/${year}`;
}

export const isGapGreaterThan24Hours = (date1: Date, date2: Date) => {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  const diffInHours = diffInMs / (1000 * 60 * 60);
  return diffInHours > 24;
};
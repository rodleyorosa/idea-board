import type { Timestamp } from "firebase/firestore";

/**
 * Converts a Firebase Timestamp into a readable English date
 * @param timestamp - The timestamp to convert
 * @param format - Desired format: 'full' | 'short' | 'relative'
 * @returns The formatted date
 */
export const formatTimestamp = (
  timestamp: Timestamp | undefined,
  format: "full" | "short" | "relative" = "short"
): string => {
  if (!timestamp) return "Date not available";

  const date = timestamp.toDate();
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Relative format (e.g. "2 hours ago", "yesterday", "3 days ago")
  if (format === "relative") {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} ${
        diffInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    if (diffInHours < 24)
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    const years = Math.floor(diffInDays / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }

  // Short format (e.g. "15 Jan 2024")
  if (format === "short") {
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }

  // Full format (e.g. "Monday, January 15, 2024, 2:30 PM")
  if (format === "full") {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("en-US");
};

/**
 * Converts a Timestamp into a short relative date (e.g. "2h ago", "3d ago")
 */
export const formatTimestampShortRelative = (
  timestamp: Timestamp | undefined
): string => {
  if (!timestamp) return "-";

  const date = timestamp.toDate();
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`;
  return `${Math.floor(diffInDays / 365)}y ago`;
};

/**
 * Checks if a timestamp is today
 */
export const isToday = (timestamp: Timestamp | undefined): boolean => {
  if (!timestamp) return false;
  const date = timestamp.toDate();
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Checks if a timestamp is yesterday
 */
export const isYesterday = (timestamp: Timestamp | undefined): boolean => {
  if (!timestamp) return false;
  const date = timestamp.toDate();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

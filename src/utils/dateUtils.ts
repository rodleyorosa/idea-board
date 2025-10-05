import type { Timestamp } from "firebase/firestore";

/**
 * Converte un Timestamp di Firebase in una data leggibile in italiano
 * @param timestamp - Il timestamp da convertire
 * @param format - Il formato desiderato: 'full' | 'short' | 'relative'
 * @returns La data formattata
 */
export const formatTimestamp = (
  timestamp: Timestamp | undefined,
  format: "full" | "short" | "relative" = "short"
): string => {
  if (!timestamp) return "Data non disponibile";

  const date = timestamp.toDate();
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Formato relativo (es: "2 ore fa", "ieri", "3 giorni fa")
  if (format === "relative") {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) return "Adesso";
    if (diffInMinutes < 60)
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minuti"} fa`;
    if (diffInHours < 24)
      return `${diffInHours} ${diffInHours === 1 ? "ora" : "ore"} fa`;
    if (diffInDays === 0) return "Oggi";
    if (diffInDays === 1) return "Ieri";
    if (diffInDays < 7) return `${diffInDays} giorni fa`;
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? "settimana" : "settimane"} fa`;
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? "mese" : "mesi"} fa`;
    }
    const years = Math.floor(diffInDays / 365);
    return `${years} ${years === 1 ? "anno" : "anni"} fa`;
  }

  // Formato breve (es: "15 Gen 2024")
  if (format === "short") {
    const day = date.getDate();
    const month = date.toLocaleDateString("it-IT", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }

  // Formato completo (es: "Lunedì 15 Gennaio 2024, 14:30")
  if (format === "full") {
    return date.toLocaleDateString("it-IT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("it-IT");
};

/**
 * Converte un Timestamp in una data relativa breve (es: "2h fa", "3g fa")
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

  if (diffInMinutes < 1) return "ora";
  if (diffInMinutes < 60) return `${diffInMinutes}m fa`;
  if (diffInHours < 24) return `${diffInHours}h fa`;
  if (diffInDays < 7) return `${diffInDays}g fa`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}set fa`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}m fa`;
  return `${Math.floor(diffInDays / 365)}a fa`;
};

/**
 * Verifica se una data è oggi
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
 * Verifica se una data è ieri
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

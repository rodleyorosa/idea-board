import type { TaskPriority, TaskStatus } from "../types";

export const getStatusColor = (status: string) => {
  const normalizedStatus = status.toLowerCase().trim();

  switch (normalizedStatus) {
    case "done":
    case "completato":
      return "bg-green-100 text-green-700 border-green-200";
    case "in progress":
    case "in corso":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "open":
    case "aperto":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-blue-100 text-blue-700 border-blue-200";
  }
};

export const getStatusIconColor = (configValue: TaskStatus, currentStatus: string) => {
  const isActive = currentStatus === configValue;

  switch (configValue) {
    case "open":
      return isActive ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600";
    case "in-progress":
      return isActive
        ? "bg-amber-500 text-white"
        : "bg-amber-100 text-amber-600";
    case "done":
      return isActive
        ? "bg-green-500 text-white"
        : "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const getStatusTextColor = (configValue: TaskStatus, currentStatus: string) => {
  const isActive = currentStatus === configValue;

  switch (configValue) {
    case "open":
      return isActive ? "text-blue-700" : "text-gray-600";
    case "in-progress":
      return isActive ? "text-amber-700" : "text-gray-600";
    case "done":
      return isActive ? "text-green-700" : "text-gray-600";
    default:
      return "text-gray-600";
  }
};

export const getPriorityConfig = (priority: TaskPriority) => {
  const normalizedPriority = (priority || "media").toLowerCase().trim();

  switch (normalizedPriority) {
    case "bassa":
      return {
        color: "text-green-600 bg-white border-green-300",
        icon: "↓",
        label: "Bassa",
      };
    case "alta":
      return {
        color: "text-red-600 bg-white border-red-300",
        icon: "↑",
        label: "Alta",
      };
    case "media":
    default:
      return {
        color: "text-yellow-600 bg-white border-yellow-300",
        icon: "→",
        label: "Media",
      };
  }
};

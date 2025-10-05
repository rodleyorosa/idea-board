import type { NoteColor, TaskPriority, TaskStatus } from "../types";

export const colors: Record<NoteColor, string> = {
  yellow: "bg-yellow-100",
  rose: "bg-rose-100",
  sky: "bg-sky-100",
  emerald: "bg-emerald-100",
  violet: "bg-violet-100",
  amber: "bg-amber-100",
};

export const statusConfig: Array<{
  value: TaskStatus;
  label: string;
  color: string;
  activeColor: string;
  icon: React.JSX.Element;
}> = [
  {
    value: "open",
    label: "Aperto",
    color: "border-gray-200 bg-white hover:border-blue-300",
    activeColor: "border-blue-500 bg-blue-50",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  {
    value: "in-progress",
    label: "In Corso",
    color: "border-gray-200 bg-white hover:border-amber-300",
    activeColor: "border-amber-500 bg-amber-50",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    value: "done",
    label: "Fatto",
    color: "border-gray-200 bg-white hover:border-green-300",
    activeColor: "border-green-500 bg-green-50",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
];

export const priorityConfig: Array<{
  value: TaskPriority;
  label: string;
  color: string;
  activeColor: string;
  icon: string;
}> = [
  {
    value: "bassa",
    label: "Bassa",
    color: "bg-white text-green-600 border-green-300 hover:border-green-400",
    activeColor: "bg-green-50 text-green-700 border-green-500",
    icon: "↓",
  },
  {
    value: "media",
    label: "Media",
    color: "bg-white text-yellow-600 border-yellow-300 hover:border-yellow-400",
    activeColor: "bg-yellow-50 text-yellow-700 border-yellow-500",
    icon: "→",
  },
  {
    value: "alta",
    label: "Alta",
    color: "bg-white text-red-600 border-red-300 hover:border-red-400",
    activeColor: "bg-red-50 text-red-700 border-red-500",
    icon: "↑",
  },
];

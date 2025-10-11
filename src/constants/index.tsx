import { AlertTriangle, Check, Zap } from "lucide-react";
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
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    value: "in-progress",
    label: "In Corso",
    color: "border-gray-200 bg-white hover:border-amber-300",
    activeColor: "border-amber-500 bg-amber-50",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    value: "done",
    label: "Fatto",
    color: "border-gray-200 bg-white hover:border-green-300",
    activeColor: "border-green-500 bg-green-50",
    icon: <Check className="w-4 h-4" />,
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
    value: "low",
    label: "Low",
    color: "bg-white text-green-600 border-green-300 hover:border-green-400",
    activeColor: "bg-green-50 text-green-700 border-green-500",
    icon: "↓",
  },
  {
    value: "medium",
    label: "Medium",
    color: "bg-white text-yellow-600 border-yellow-300 hover:border-yellow-400",
    activeColor: "bg-yellow-50 text-yellow-700 border-yellow-500",
    icon: "→",
  },
  {
    value: "high",
    label: "High",
    color: "bg-white text-red-600 border-red-300 hover:border-red-400",
    activeColor: "bg-red-50 text-red-700 border-red-500",
    icon: "↑",
  },
];

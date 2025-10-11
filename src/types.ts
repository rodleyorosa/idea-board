import type { Timestamp } from "firebase/firestore";

export type NoteColor =
  | "yellow"
  | "rose"
  | "sky"
  | "emerald"
  | "violet"
  | "amber";

export type NoteItem = {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};

export type TaskStatus = "open" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type TaskItemType = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
};

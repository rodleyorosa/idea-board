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
  updatedAt?: Timestamp;
};

export type TodoItemType = {
  title: string;
  description: string;
};

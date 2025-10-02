export type NoteColor = "yellow" | "rose" | "sky" | "emerald" | "violet" | "amber";

export type NoteItem = {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  createdAt: string
};

export type TodoItemType = {
  title: string;
  description: string;
};

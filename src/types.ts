export type NoteColor = "yellow" | "rose" | "sky" | "emerald" | "violet" | "amber";


export type NoteItem = {
  id: number;
  title: string;
  content: string;
  color: NoteColor;
};

export type TodoItemType = {
  title: string;
  description: string;
};

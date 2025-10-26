import { useCallback, useMemo, useState } from "react";
import { DEFAULT_COLOR } from "../constants";
import type { NoteColor, NoteItem } from "../types";

export function useNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<NoteColor>(DEFAULT_COLOR);

  const isSaveDisabled = useMemo(() => {
    return !title.trim() && !content.trim();
  }, [title, content]);

  const updateFromNote = useCallback((note: NoteItem) => {
    setTitle(note.title);
    setContent(note.content);
    setColor(note.color);
  }, []);

  return {
    title,
    content,
    color,
    isSaveDisabled,
    setTitle,
    setContent,
    setColor,
    updateFromNote,
  };
}

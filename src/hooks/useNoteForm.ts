import { useCallback, useMemo, useState } from "react";
import type { NoteColor, NoteItem } from "../types";

interface UseNoteFormProps {
  initialTitle?: string;
  initialContent?: string;
  initialColor?: NoteColor;
}

export function useNoteForm({
  initialTitle = "",
  initialContent = "",
  initialColor = "yellow" as NoteColor,
}: UseNoteFormProps = {}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [color, setColor] = useState<NoteColor>(initialColor);

  const isSaveDisabled = useMemo(() => {
    return !title.trim() && !content.trim();
  }, [title, content]);

  const resetForm = useCallback(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setColor(initialColor);
  }, [initialTitle, initialContent, initialColor]);

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
    resetForm,
    updateFromNote,
  };
}

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useNote } from "../hooks/useNote";
import { useNoteForm } from "../hooks/useNoteForm";
import { MainContentWrapper } from "../MainContentWrapper";
import { NoteContainer } from "./components/NoteContainer";
import { NoteContent } from "./components/NoteContent";
import { NoteFooter } from "./components/NoteFooter";
import { NoteHeader } from "./components/NoteHeader";

export const NoteCreation = () => {
  const navigate = useNavigate();
  const { addNote } = useNote();
  const {
    title,
    content,
    color,
    isSaveDisabled,
    setTitle,
    setContent,
    setColor,
  } = useNoteForm();

  const handleBack = useCallback(() => {
    navigate("/sticky-wall");
  }, [navigate]);

  const handleSave = useCallback(async () => {
    if (isSaveDisabled) return;

    try {
      await addNote(title, content, color);
      navigate("/sticky-wall");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }, [addNote, color, content, navigate, title, isSaveDisabled]);

  return (
    <MainContentWrapper title="New Note" className="lg:w-2/3" fullscreenMobile>
      <NoteContainer color={color}>
        <NoteHeader
          title={title}
          isEditing
          onBack={handleBack}
          onTitleChange={setTitle}
        />
        <NoteContent content={content} isEditing onChange={setContent} />
        <NoteFooter
          isEditing
          color={color}
          isSaveDisabled={isSaveDisabled}
          onColorChange={setColor}
          onCancel={handleBack}
          onSave={handleSave}
          saveButtonText="Create"
          cancelButtonText="Cancel"
        />
      </NoteContainer>
    </MainContentWrapper>
  );
};

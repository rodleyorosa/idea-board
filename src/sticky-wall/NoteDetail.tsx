import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNote } from "../hooks/useNote";
import { useNoteForm } from "../hooks/useNoteForm";
import { MainContentWrapper } from "../MainContentWrapper";
import type { NoteItem } from "../types";
import { formatTimestamp } from "../utils/dateUtils";
import { NoteContainer } from "./components/NoteContainer";
import { NoteContent } from "./components/NoteContent";
import { NoteFooter } from "./components/NoteFooter";
import { NoteHeader } from "./components/NoteHeader";

export const NoteDetail = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const { notes, editNote, deleteNote } = useNote();

  const [note, setNote] = useState<NoteItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    title,
    content,
    color,
    isSaveDisabled,
    setTitle,
    setContent,
    setColor,
    updateFromNote,
  } = useNoteForm();

  useEffect(() => {
    const foundNote = notes.find((note) => note.id === noteId);
    if (foundNote) {
      setNote(foundNote);
      updateFromNote(foundNote);
    }
  }, [noteId, notes, updateFromNote]);

  const handleBack = useCallback(() => {
    navigate("/sticky-wall");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    if (note) {
      updateFromNote(note);
    }
    setIsEditing(false);
  }, [note, updateFromNote]);

  const handleSave = useCallback(async () => {
    if (!note || isSaveDisabled) return;

    try {
      await editNote(note.id, title, content, color);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }, [note, title, content, color, editNote, isSaveDisabled]);

  const handleDelete = useCallback(async () => {
    if (showDeleteConfirm && note) {
      try {
        await deleteNote(note.id);
        navigate("/sticky-wall");
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  }, [showDeleteConfirm, note, deleteNote, navigate]);

  if (!note) {
    return (
      <MainContentWrapper title="Note not found" className="lg:w-2/3">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Note not found
          </h2>
          <p className="text-gray-600 mb-6">
            The note you are looking for does not exist or has been deleted.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Go back to notes
          </button>
        </div>
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper
      title="Note Details"
      className="lg:w-2/3"
      fullscreenMobile
    >
      <NoteContainer color={color}>
        <NoteHeader
          title={title}
          isEditing={isEditing}
          showDeleteConfirm={showDeleteConfirm}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTitleChange={setTitle}
        />
        <NoteContent
          content={content}
          isEditing={isEditing}
          onChange={setContent}
        />
        <NoteFooter
          isEditing={isEditing}
          color={color}
          timestamp={formatTimestamp(note.createdAt)}
          isSaveDisabled={isSaveDisabled}
          onColorChange={setColor}
          onCancel={handleCancelEdit}
          onSave={handleSave}
          saveButtonText="Save"
          cancelButtonText="Cancel"
        />
      </NoteContainer>
    </MainContentWrapper>
  );
};

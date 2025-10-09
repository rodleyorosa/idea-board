// src/sticky-wall/NoteDetail.tsx
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "../assets/ArrowBack";
import { colors } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useNote } from "../hooks/useNote";
import { MainContentWrapper } from "../MainContentWrapper";
import type { NoteColor, NoteItem } from "../types";
import { formatTimestamp } from "../utils/dateUtils";

export const NoteDetail = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notes, editNote, deleteNote } = useNote(user?.uid || null);

  const [note, setNote] = useState<NoteItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<NoteColor>("yellow");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const foundNote = notes.find((n) => n.id === noteId);
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title);
      setContent(foundNote.content);
      setColor(foundNote.color);
    }
  }, [noteId, notes]);

  const handleBack = useCallback(() => {
    navigate("/sticky-wall");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setColor(note.color);
    }
    setIsEditing(false);
  }, [note]);

  const handleSave = useCallback(async () => {
    if (note && (title.trim() || content.trim())) {
      try {
        await editNote(note.id, title, content, color);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  }, [note, title, content, color, editNote]);

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
      <MainContentWrapper title="Nota non trovata" className="lg:w-2/3">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Nota non trovata
          </h2>
          <p className="text-gray-600 mb-6">
            La nota che stai cercando non esiste o è stata eliminata.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Torna alle note
          </button>
        </div>
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper
      title="Dettaglio Nota"
      className="lg:w-2/3"
      fullscreenMobile
    >
      <div
        className={`${colors[color]} sm:rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[calc(100vh-8rem)] sm:min-h-[600px]`}
      >
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-200/50 flex-shrink-0 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <ArrowBack
              onClick={handleBack}
              className="hover:bg-white/30 text-gray-700 flex-shrink-0"
            />
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/70 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 text-lg font-bold min-w-0"
                placeholder="Titolo..."
              />
            ) : (
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate flex-1 min-w-0">
                {note.title || "Senza titolo"}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center justify-center w-10 h-10 bg-white/50 hover:bg-white/70 rounded-lg transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={handleDelete}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer ${
                showDeleteConfirm
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-white/50 hover:bg-white/70 text-gray-700"
              }`}
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-white/70 border-2 border-gray-300 rounded-xl resize-none outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-700 text-base leading-relaxed min-h-[300px]"
              placeholder="Contenuto..."
            />
          ) : (
            <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
              {note.content || "Nessun contenuto"}
            </div>
          )}
        </div>

        <div className="p-6 bg-white/30 backdrop-blur-sm border-t border-gray-200/50 flex-shrink-0">
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Colore:
                </span>
                <div className="flex gap-2">
                  {(Object.entries(colors) as [NoteColor, string][]).map(
                    ([colorName, colorClass]) => (
                      <button
                        key={colorName}
                        type="button"
                        onClick={() => setColor(colorName)}
                        className={`w-8 h-8 rounded-full ${colorClass} border-2 transition-transform hover:scale-110 cursor-pointer ${
                          color === colorName
                            ? "border-slate-800 scale-110"
                            : "border-slate-300"
                        }`}
                        title={colorName}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Bottoni azione */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formatTimestamp(note.createdAt)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-sm"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!title.trim() && !content.trim()}
                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-sm"
                  >
                    Salva
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-600">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formatTimestamp(note.createdAt)}</span>
            </div>
          )}
        </div>
      </div>
    </MainContentWrapper>
  );
};

import { ChevronLeft, Clock, Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../constants";
import { useNote } from "../hooks/useNote";
import { MainContentWrapper } from "../MainContentWrapper";
import type { NoteColor, NoteItem } from "../types";
import { formatTimestamp } from "../utils/dateUtils";

export const NoteDetail = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const navigate = useNavigate();
  const { notes, editNote, deleteNote } = useNote();

  const [note, setNote] = useState<NoteItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<NoteColor>("yellow");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const foundNote = notes.find((note) => note.id === noteId);
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
      <div
        className={`${colors[color]} sm:rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[calc(100vh-8rem)] sm:min-h-[600px]`}
      >
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-200/50 flex-shrink-0 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer flex-shrink-0 hover:bg-white/30 text-gray-700"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2} />
            </button>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/70 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 text-lg font-bold min-w-0"
                placeholder="Title..."
              />
            ) : (
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate flex-1 min-w-0">
                {note.title || "No title"}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer bg-white/50 hover:bg-white/70 text-gray-700"
              >
                <Pencil className="w-4 h-4" />
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
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-white/70 border-2 border-gray-300 rounded-xl resize-none outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-700 text-base leading-relaxed min-h-[300px]"
              placeholder="Content..."
            />
          ) : (
            <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
              {note.content || "No content"}
            </div>
          )}
        </div>

        <div className="p-6 bg-white/30 backdrop-blur-sm border-t border-gray-200/50 flex-shrink-0">
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Color:
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

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimestamp(note.createdAt)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCancelEdit}
                    className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!title.trim() && !content.trim()}
                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimestamp(note.createdAt)}</span>
            </div>
          )}
        </div>
      </div>
    </MainContentWrapper>
  );
};

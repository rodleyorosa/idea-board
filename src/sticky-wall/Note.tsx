import { useCallback, useState } from "react";
import { colors } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useNote } from "../hooks/useNote";
import type { NoteColor, NoteItem } from "../types";

interface NoteProps {
  item: NoteItem;
  closeNote: () => void;
}

export const Note = ({ item, closeNote }: NoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [color, setColor] = useState(item.color);
  const { user } = useAuth();
  const { editNote, deleteNote } = useNote(user?.uid || null);

  const exitEditing = useCallback(() => {
    setIsEditing(false);
    setTitle(item.title);
    setContent(item.content);
    setColor(item.color);
  }, [item]);

  const updateNote = useCallback(() => {
    editNote(item.id, title, content, color);
    closeNote();
  }, [item.id, title, content, color, editNote, closeNote]);

  const deleteNoteCallback = useCallback(() => {
    deleteNote(item.id);
    closeNote();
  }, [deleteNote, closeNote, item.id]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && closeNote()}
    >
      <div
        onDoubleClick={() => setIsEditing(true)}
        className={`${colors[color]} rounded-lg shadow-2xl h-full w-full max-w-lg sm:max-w-xl lg:max-w-2xl min-h-96 max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col ${isEditing ? 'p-4' : 'p-8'} gap-4`}
      >
        <div className="flex justify-between items-center flex-shrink-0">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 font-bold text-gray-800 bg-white/50 px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none mr-4"
              placeholder="Titolo..."
            />
          ) : (
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate pr-4">
              {item.title}
            </h2>
          )}
          <button
            onClick={closeNote}
            className="w-8 h-8 rounded-full text-gray-500 text-xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto h-full">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[200px] text-gray-700 bg-white/50 p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none resize-none"
              placeholder="Contenuto..."
            />
          ) : (
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {item.content}
            </div>
          )}
        </div>
        <div
          className={`flex flex-col md:flex-row ${
            isEditing ? "justify-between" : "justify-end"
          } md:items-center gap-4`}
        >
          {isEditing && (
            <div className="flex gap-3">
              {(Object.entries(colors) as [NoteColor, string][]).map(
                ([colorName, colorClass]) => (
                  <button
                    key={colorName}
                    onClick={() => setColor(colorName)}
                    className={`w-8 h-8 rounded-full ${colorClass} border-2 transition-transform hover:scale-110 ${
                      color === colorName
                        ? "border-slate-800 scale-110"
                        : "border-slate-300"
                    }`}
                  />
                )
              )}
            </div>
          )}
          <div className="flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={exitEditing}
                  className="cursor-pointer px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={updateNote}
                  className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Aggiorna
                </button>
              </>
            ) : (
              <button
                onClick={deleteNoteCallback}
                className="cursor-pointer px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

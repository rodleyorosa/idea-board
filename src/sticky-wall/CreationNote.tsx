import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { colors } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useNote } from "../hooks/useNote";
import type { NoteColor } from "../types";

interface CreationNoteProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreationNote = ({
  isModalOpen,
  setIsModalOpen,
}: CreationNoteProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<NoteColor>("yellow");

  const { user } = useAuth();
  const { addNote } = useNote(user?.uid || null);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTitle("");
    setContent("");
    setColor("yellow")
    // unblock the scroll when the modal is closed
    document.body.style.overflow = "unset";
  }, [setIsModalOpen]);

  const saveNote = useCallback(() => {
    addNote(title, content, color);
    closeModal();
  }, [addNote, closeModal, color, content, title]);

  if (!isModalOpen) return;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        className={`${colors[color]} rounded-lg shadow-2xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl min-h-96 max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col p-4 gap-4`}
      >
        <div className="flex justify-between items-center flex-shrink-0">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 font-bold text-gray-800 bg-white/50 px-3 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none mr-4"
            placeholder="Inserisci il titolo..."
          />
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full text-gray-500 text-xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full h-full min-h-[200px] text-gray-700 bg-white/50 p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="Scrivi il contenuto della nota..."
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
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
          <div className="flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="cursor-pointer px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Annulla
            </button>
            <button
              onClick={saveNote}
              disabled={!title.trim() && !content.trim()}
              className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Salva Nota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

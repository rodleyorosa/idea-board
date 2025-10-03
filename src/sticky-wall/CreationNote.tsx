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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Nuova Nota</h2>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 text-xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titolo
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Inserisci il titolo..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contenuto
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-vertical"
              placeholder="Scrivi il contenuto della nota..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Colore
            </label>
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
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-8">
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
  );
};

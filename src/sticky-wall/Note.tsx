import { useCallback } from "react";
import { colors } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useFirebase } from "../hooks/useFirebase";
import type { NoteItem } from "../types";

interface NoteProps {
  item: NoteItem;
  closeNote: () => void;
}

export const Note = ({ item, closeNote }: NoteProps) => {
  const { user } = useAuth();
  const { deleteNote } = useFirebase(user?.uid || null);

  const deleteNoteCallback = useCallback(() => {
    deleteNote(item.id);
    closeNote();
  }, [deleteNote, closeNote, item.id]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5"
      onClick={(e) => e.target === e.currentTarget && closeNote()}
    >
      <div
        className={`${
          colors[item.color]
        } rounded-lg shadow-2xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl min-h-96 max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col relative`}
      >
        <div className="flex justify-between items-center p-4 sm:p-6 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate pr-4">
            {item.title}
          </h2>
          <button
            onClick={closeNote}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 text-xl cursor-pointer transition-colors flex-shrink-0"
          >
            ×
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {item.content}
          </div>
        </div>
        <div className="p-4 sm:p-6 flex justify-end flex-shrink-0">
          <button
            onClick={deleteNoteCallback}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

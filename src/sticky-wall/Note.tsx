import type { NoteItem } from "../types";

interface NoteProps {
  item: NoteItem;
  closeNote: () => void;
}

interface NoteProps {
  item: NoteItem;
  closeNote: () => void;
}

export const Note = ({ item, closeNote }: NoteProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5"
      onClick={(e) => e.target === e.currentTarget && closeNote()}
    >
      <div className="bg-pink-100 rounded-lg shadow-2xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl min-h-96 max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-pink-200 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate pr-4">
            {item.title}
          </h2>
          <button
            onClick={closeNote}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 text-xl cursor-pointer hover:bg-pink-200 transition-colors flex-shrink-0"
          >
            ×
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
};

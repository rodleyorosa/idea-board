import type { NoteItem } from "../types";

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
      <div className="bg-pink-100 rounded-lg shadow-2xl min-w-96 aspect-square p-4 max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-pink-200">
          <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
          <button
            onClick={closeNote}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 text-xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
};

import { ChevronLeft, Pencil, Trash2 } from "lucide-react";

interface NoteHeaderProps {
  title: string;
  isEditing: boolean;
  showDeleteConfirm?: boolean;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onTitleChange?: (value: string) => void;
}

export function NoteHeader({
  title,
  isEditing,
  showDeleteConfirm = false,
  onBack,
  onEdit,
  onDelete,
  onTitleChange,
}: NoteHeaderProps) {
  return (
    <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-200/50 flex-shrink-0 gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer flex-shrink-0 hover:bg-white/30 text-gray-700"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        </button>

        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange?.(e.target.value)}
            maxLength={50}
            className="flex-1 px-3 py-2 bg-white/70 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 text-lg font-bold min-w-0"
            placeholder="Title..."
          />
        ) : (
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate flex-1 min-w-0">
            {title || "No title"}
          </h2>
        )}
      </div>

      {(onEdit || onDelete) && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {!isEditing && onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer bg-white/50 hover:bg-white/70 text-gray-700"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer ${
                showDeleteConfirm
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-white/50 hover:bg-white/70 text-gray-700"
              }`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

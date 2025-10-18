import { Info } from "lucide-react";

interface TaskFooterProps {
  timestamp?: string;
  isEditing?: boolean;
  isSaveDisabled?: boolean;
  onCancel: () => void;
  onSave: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
}

export function TaskFooter({
  timestamp,
  isEditing = false,
  isSaveDisabled = false,
  onCancel,
  onSave,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
}: TaskFooterProps) {
  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 flex-shrink-0">
      <div
        className={`flex sm:flex-row items-start sm:items-center ${
          isEditing ? "justify-end" : "justify-between"
        } gap-3`}
      >
        {!isEditing && timestamp ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Info className="w-3.5 h-3.5" />
            <span>{timestamp}</span>
          </div>
        ) : (
          <div
            className={`flex gap-3 ${
              isEditing ? "w-full sm:w-auto" : "ml-auto"
            }`}
          >
            <button
              onClick={onCancel}
              className="w-full px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
            >
              {cancelButtonText}
            </button>
            <button
              onClick={onSave}
              disabled={isSaveDisabled}
              title={isSaveDisabled ? "Add title" : undefined}
              className="w-full px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {saveButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { Clock } from "lucide-react";
import type { NoteColor } from "../../types";
import { ColorPicker } from "./ColorPicker";

interface NoteFooterProps {
  isEditing: boolean;
  color: NoteColor;
  timestamp?: string;
  isSaveDisabled?: boolean;
  onColorChange: (color: NoteColor) => void;
  onCancel: () => void;
  onSave: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
}

export function NoteFooter({
  isEditing,
  color,
  timestamp,
  isSaveDisabled = false,
  onColorChange,
  onCancel,
  onSave,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
}: NoteFooterProps) {
  return (
    <div className="p-6 bg-white/30 backdrop-blur-sm border-t border-gray-200/50 flex-shrink-0">
      {isEditing ? (
        <div className="flex items-center flex-col sm:flex-row sm:justify-between gap-4">
          <ColorPicker selectedColor={color} onColorChange={onColorChange} />

          <div
            className={`w-full flex items-center gap-3 ${
              isEditing ? "justify-end" : "justify-between"
            }`}
          >
            <button
              onClick={onCancel}
              className="w-full px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-sm"
            >
              {cancelButtonText}
            </button>
            <button
              onClick={onSave}
              disabled={isSaveDisabled}
              title={isSaveDisabled ? "Add title or content" : undefined}
              className="w-full px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-sm"
            >
              {saveButtonText}
            </button>
          </div>
        </div>
      ) : (
        timestamp && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{timestamp}</span>
          </div>
        )
      )}
    </div>
  );
}

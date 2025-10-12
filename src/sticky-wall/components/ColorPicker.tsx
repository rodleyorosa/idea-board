import { colors } from "../../constants";
import type { NoteColor } from "../../types";

interface ColorPickerProps {
  selectedColor: NoteColor;
  onColorChange: (color: NoteColor) => void;
}

export function ColorPicker({
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">Color:</span>
      <div className="flex gap-2">
        {(Object.entries(colors) as [NoteColor, string][]).map(
          ([colorName, colorClass]) => (
            <button
              key={colorName}
              type="button"
              onClick={() => onColorChange(colorName)}
              className={`w-8 h-8 rounded-full ${colorClass} border-2 transition-transform hover:scale-110 cursor-pointer ${
                selectedColor === colorName
                  ? "border-slate-800 scale-110"
                  : "border-slate-300"
              }`}
              title={colorName}
            />
          )
        )}
      </div>
    </div>
  );
}

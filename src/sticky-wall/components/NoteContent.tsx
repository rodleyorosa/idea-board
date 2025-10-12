interface NoteContentProps {
  content: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
}

export function NoteContent({
  content,
  isEditing,
  onChange,
}: NoteContentProps) {
  return (
    <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-3 bg-white/70 border-2 border-gray-300 rounded-xl resize-none outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-700 text-base leading-relaxed min-h-[300px]"
          placeholder="Content..."
        />
      ) : (
        <div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
          {content || "No content"}
        </div>
      )}
    </div>
  );
}

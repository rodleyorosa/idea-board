interface TaskTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TaskTextarea({
  value,
  onChange,
  rows = 6,
  ...props
}: TaskTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none outline-none focus:border-purple-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder:text-gray-400"
      {...props}
    />
  );
}

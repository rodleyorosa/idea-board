interface TaskInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TaskInput({ value, onChange, ...props }: TaskInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder:text-gray-400"
      {...props}
    />
  );
}

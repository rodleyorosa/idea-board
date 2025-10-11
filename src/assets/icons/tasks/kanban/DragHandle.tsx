export const DragHandle = () => {
  return (
    <div className="flex items-center gap-0.5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-150">
      <svg className="w-1 h-4" fill="currentColor" viewBox="0 0 4 16">
        <circle cx="2" cy="2" r="1" />
        <circle cx="2" cy="8" r="1" />
        <circle cx="2" cy="14" r="1" />
      </svg>
      <svg className="w-1 h-4" fill="currentColor" viewBox="0 0 4 16">
        <circle cx="2" cy="2" r="1" />
        <circle cx="2" cy="8" r="1" />
        <circle cx="2" cy="14" r="1" />
      </svg>
    </div>
  );
};

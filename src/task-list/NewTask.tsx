interface NewTaskProps {
  openCreateTask: () => void;
}
export const NewTask = ({ openCreateTask }: NewTaskProps) => {
  return (
    <div
      onClick={openCreateTask}
      className="border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl p-6 cursor-pointer transition-all duration-300 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <svg
            className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
            Aggiungi nuova attività
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
            Clicca per creare un nuovo task
          </p>
        </div>
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-all duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

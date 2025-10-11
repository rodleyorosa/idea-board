import { Frown } from "lucide-react";

interface TaskNotFoundProps {
  onClick: () => void;
}

export const TaskNotFound = ({ onClick }: TaskNotFoundProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Frown className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Task not found</h2>
      <p className="text-gray-600 mb-6">
        The task you are looking for does not exist or has been deleted.
      </p>
      <button
        onClick={onClick}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
      >
        Go back to the list
      </button>
    </div>
  );
};

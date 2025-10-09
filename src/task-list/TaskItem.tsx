import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../hooks/useTask";
import type { TaskItemType } from "../types";
import { getPriorityConfig, getStatusColor } from "../utils";

interface TaskItemProps {
  task: TaskItemType;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const { deleteTask } = useTask();

  const priorityConfig = getPriorityConfig(task.priority);

  const openTask = useCallback(() => {
    navigate(`/task/${task.id}`);
  }, [navigate, task.id]);

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (showDeleteConfirm) {
        try {
          await deleteTask(task.id);
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      } else {
        setShowDeleteConfirm(true);
        setTimeout(() => setShowDeleteConfirm(false), 3000);
      }
    },
    [deleteTask, task.id, showDeleteConfirm]
  );

  return (
    <>
      <div
        onClick={openTask}
        className="group bg-white border border-gray-200 hover:border-indigo-300 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        {/* Mobile Layout (< sm) */}
        <div className="sm:hidden">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 font-semibold text-xs ${priorityConfig.color}`}
                title={`Priorità ${priorityConfig.label}`}
              >
                {priorityConfig.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300 line-clamp-2 flex-1">
                {task.title}
              </h3>
            </div>
            <button
              onClick={handleDelete}
              className={`p-1 rounded-lg transition-all duration-200 cursor-pointer flex-shrink-0 ${
                showDeleteConfirm
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
              title={
                showDeleteConfirm ? "Clicca per confermare" : "Elimina task"
              }
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
          {task.description && (
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2 ml-8">
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-end gap-2 ml-8">
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
        </div>

        {/* Desktop Layout (>= sm) */}
        <div className="hidden sm:flex gap-4 items-start">
          <div
            className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 font-semibold text-sm ${priorityConfig.color}`}
            title={`Priorità ${priorityConfig.label}`}
          >
            {priorityConfig.icon}
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                {task.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
                <button
                  onClick={handleDelete}
                  className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                    showDeleteConfirm
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                  title={
                    showDeleteConfirm ? "Clicca per confermare" : "Elimina task"
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0"
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
    </>
  );
};

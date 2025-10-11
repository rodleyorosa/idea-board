import { ChevronRight, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../hooks/useTask";
import type { TaskItemType } from "../../types";
import { getPriorityConfig, getStatusColor } from "../../utils";

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
        className="group bg-white border-2 border-gray-100 hover:border-indigo-300 rounded-2xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        {/* Mobile Layout (< sm) */}
        <div className="sm:hidden">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm ${priorityConfig.color} shadow-sm`}
                title={`Priorità ${priorityConfig.label}`}
              >
                {priorityConfig.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300 line-clamp-2 flex-1">
                {task.title}
              </h3>
            </div>
            <button
              onClick={handleDelete}
              className={`p-2 rounded-xl transition-all duration-200 cursor-pointer flex-shrink-0 ${
                showDeleteConfirm
                  ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
              title={showDeleteConfirm ? "Click to confirm" : "Delete task"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          {task.description && (
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3 ml-11 whitespace-pre-wrap">
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-end gap-2 ml-11">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full border-2 ${getStatusColor(
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
            className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center flex-shrink-0 font-bold text-base ${priorityConfig.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}
            title={`Priorità ${priorityConfig.label}`}
          >
            {priorityConfig.icon}
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                {task.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border-2 ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
                <button
                  onClick={handleDelete}
                  className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    showDeleteConfirm
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30"
                      : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                  title={showDeleteConfirm ? "Click to confirm" : "Delete task"}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" />
        </div>
      </div>
    </>
  );
};

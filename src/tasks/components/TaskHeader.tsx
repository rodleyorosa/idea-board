import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import type { TaskItemType } from "../../types";

interface TaskHeaderProps {
  title?: string;
  subtitle?: string;
  isEditing?: boolean;
  showDeleteConfirm?: boolean;
  status?: TaskItemType["status"];
  priority?: TaskItemType["priority"];
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: TaskItemType["status"]) => void;
  onPriorityChange?: (priority: TaskItemType["priority"]) => void;
}

export function TaskHeader({
  title,
  subtitle,
  isEditing = false,
  showDeleteConfirm = false,
  status,
  priority,
  onBack,
  onEdit,
  onDelete,
  onStatusChange,
  onPriorityChange,
}: TaskHeaderProps) {
  const getPriorityColor = (p: TaskItemType["priority"]) => {
    switch (p) {
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusColor = (s: TaskItemType["status"]) => {
    switch (s) {
      case "done":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityIcon = (p: TaskItemType["priority"]) => {
    switch (p) {
      case "low":
        return "↓";
      case "high":
        return "↑";
      default:
        return "→";
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      {/* Title and Status Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>

          <div>
            <span className="text-white font-bold text-xl">{title}</span>
            {subtitle && (
              <p className="text-white/90 text-sm mt-0.5">{subtitle}</p>
            )}

            {(status || priority) && (
              <div className="flex items-center gap-2 mt-1">
                {priority && (
                  <>
                    {isEditing && onPriorityChange ? (
                      <select
                        value={priority}
                        onChange={(e) =>
                          onPriorityChange(
                            e.target.value as TaskItemType["priority"]
                          )
                        }
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border backdrop-blur-sm cursor-pointer ${getPriorityColor(
                          priority
                        )}`}
                      >
                        <option value="low">↓ Low</option>
                        <option value="medium">→ Medium</option>
                        <option value="high">↑ High</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-0.5 ${getPriorityColor(
                          priority
                        )} backdrop-blur-sm rounded-full text-xs font-medium border flex items-center gap-1`}
                      >
                        <span className="font-bold">
                          {getPriorityIcon(priority)}
                        </span>
                      </span>
                    )}
                  </>
                )}

                {status && (
                  <>
                    {isEditing && onStatusChange ? (
                      <select
                        value={status}
                        onChange={(e) =>
                          onStatusChange(
                            e.target.value as TaskItemType["status"]
                          )
                        }
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border backdrop-blur-sm cursor-pointer ${getStatusColor(
                          status
                        )}`}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-0.5 ${getStatusColor(
                          status
                        )} backdrop-blur-sm rounded-full text-xs font-medium`}
                      >
                        {status}
                      </span>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {(onEdit || onDelete) && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {!isEditing && onEdit && (
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    showDeleteConfirm
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{showDeleteConfirm ? "Confirm" : "Delete"}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile: Action Buttons */}
        {(onEdit || onDelete) && (
          <div className="flex sm:hidden items-center gap-2">
            {!isEditing && onEdit && (
              <button
                onClick={onEdit}
                className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer ${
                  showDeleteConfirm
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>{showDeleteConfirm ? "Confirm" : "Delete"}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

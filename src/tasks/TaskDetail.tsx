import {
  AlignLeft,
  ChevronLeft,
  ClipboardList,
  Info,
  Pencil,
  Tag,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTask } from "../hooks/useTask";
import { MainContentWrapper } from "../MainContentWrapper";
import type { TaskItemType } from "../types";
import { getStatusColor } from "../utils";
import { formatTimestamp } from "../utils/dateUtils";
import { TaskNotFound } from "./TaskNotFound";

export const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, editTask, deleteTask } = useTask();

  const [task, setTask] = useState<TaskItemType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskItemType["status"]>("open");
  const [priority, setPriority] = useState<TaskItemType["priority"]>("medium");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
      setTitle(foundTask.title);
      setDescription(foundTask.description);
      setStatus(foundTask.status);
      setPriority(foundTask.priority);
    }
  }, [taskId, tasks]);

  const handleBack = useCallback(() => {
    navigate("/task-list");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    }
    setIsEditing(false);
  }, [task]);

  const handleSave = useCallback(async () => {
    if (task && title.trim()) {
      try {
        await editTask(task.id, title, description, status, priority);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  }, [task, title, description, status, priority, editTask]);

  const handleDelete = useCallback(async () => {
    if (showDeleteConfirm && task) {
      try {
        await deleteTask(task.id);
        navigate("/task-list");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  }, [showDeleteConfirm, task, deleteTask, navigate]);

  if (!task) {
    return (
      <MainContentWrapper title="Task non trovato" className="lg:w-2/3">
        <TaskNotFound onClick={handleBack} />
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper
      title="Task Details"
      className="lg:w-2/3"
      fullscreenMobile
    >
      <div className="bg-white sm:rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="hidden sm:flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Go back</span>
            </button>
            <div className="flex items-center gap-2">
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              <button
                onClick={handleDelete}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  showDeleteConfirm
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>{showDeleteConfirm ? "Confirm" : "Delete"}</span>
              </button>
            </div>
          </div>

          {/* Mobile + Desktop: task info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile: back arrow */}
              <button
                onClick={handleBack}
                className="sm:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-white/90 text-sm font-medium">
                  Task Details
                </span>
                <div className="flex items-center gap-2 mt-1">
                  {isEditing ? (
                    <>
                      <select
                        value={priority}
                        onChange={(e) =>
                          setPriority(
                            e.target.value as TaskItemType["priority"]
                          )
                        }
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border backdrop-blur-sm cursor-pointer ${
                          priority === "low"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : priority === "high"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        <option value="low">↓ Low</option>
                        <option value="medium">→ Medium</option>
                        <option value="high">↑ High</option>
                      </select>
                      <select
                        value={status}
                        onChange={(e) =>
                          setStatus(e.target.value as TaskItemType["status"])
                        }
                        className={`px-2 py-0.5 text-xs font-medium rounded-full border backdrop-blur-sm cursor-pointer ${getStatusColor(
                          status
                        )}`}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <span
                        className={`px-2 py-0.5 ${
                          priority === "low"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : priority === "high"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        } backdrop-blur-sm rounded-full text-xs font-medium border flex items-center gap-1`}
                      >
                        <span className="font-bold">
                          {priority === "low"
                            ? "↓"
                            : priority === "high"
                            ? "↑"
                            : "→"}
                        </span>
                      </span>
                      <span
                        className={`px-2 py-0.5 ${getStatusColor(
                          task.status
                        )} backdrop-blur-sm rounded-full text-xs font-medium`}
                      >
                        {task.status}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile: action buttons */}
            <div className="flex sm:hidden items-center gap-2">
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleDelete}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer ${
                  showDeleteConfirm
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto bg-white">
          <div className="space-y-6">
            {/* Title */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <div className="w-5 h-5 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <Tag className="w-3 h-3 text-indigo-600" />
                </div>
                Title
                <span className="text-red-500">*</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
                  placeholder="Task name"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-800">
                  {task.title}
                </h2>
              )}
            </div>

            {/* Description */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <AlignLeft className="w-3 h-3 text-purple-600" />
                </div>
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-700"
                  rows={5}
                  placeholder="Add a detailed description..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {task.description || "No description available"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              <span>{formatTimestamp(task.createdAt)}</span>
            </div>
            {isEditing && (
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!title.trim()}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};

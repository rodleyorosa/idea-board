import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { priorityConfig, statusConfig } from "../constants";
import { useTodoList } from "../hooks/useTodoList";
import type { TaskItem } from "../types";
import {
  getStatusColor,
  getStatusIconColor,
  getStatusTextColor,
} from "../utils";
import { formatTimestamp } from "../utils/dateUtils";

interface TodoDetailModalProps {
  task: TaskItem;
  isTodoDetailModalOpened: boolean;
  setIsTodoDetailModalOpened: Dispatch<SetStateAction<boolean>>;
}

export const TodoDetailModal = ({
  task,
  isTodoDetailModalOpened,
  setIsTodoDetailModalOpened,
}: TodoDetailModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const { editTask } = useTodoList();

  const closeTodoDetailModal = useCallback(() => {
    setIsTodoDetailModalOpened(false);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    // unblock the scroll when the modal is closed
    document.body.style.overflow = "unset";
  }, [
    setIsTodoDetailModalOpened,
    setTitle,
    setDescription,
    setStatus,
    setPriority,
    task,
  ]);

  const updateTask = useCallback(() => {
    editTask(task.id, title, description, status, priority);
    closeTodoDetailModal();
  }, [
    editTask,
    task,
    title,
    description,
    status,
    priority,
    closeTodoDetailModal,
  ]);

  if (!isTodoDetailModalOpened) return;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && closeTodoDetailModal()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden transform transition-all animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <span className="text-white/90 text-sm font-medium">
                  Dettagli Attività
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 ${getStatusColor(
                      task.status
                    )} backdrop-blur-sm rounded-full text-xs font-medium`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={closeTodoDetailModal}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Titolo */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <div className="w-5 h-5 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <svg
                    className="w-3 h-3 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                Titolo
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
                placeholder="Nome attività"
              />
            </div>

            {/* Descrizione */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <svg
                    className="w-3 h-3 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </div>
                Descrizione
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-700"
                rows={5}
                placeholder="Aggiungi una descrizione dettagliata..."
              />
            </div>

            {/* Priorità */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <svg
                    className="w-3 h-3 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span>Priorità</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {priorityConfig.map((config) => (
                  <button
                    key={config.value}
                    type="button"
                    onClick={() => setPriority(config.value)}
                    className={`px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                      priority === config.value
                        ? config.activeColor
                        : config.color
                    }`}
                  >
                    <span className="text-lg">{config.icon}</span>
                    <span>{config.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="group">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <div className="w-5 h-5 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <svg
                      className="w-4 h-4 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  Status
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {statusConfig.map((config) => (
                    <button
                      key={config.value}
                      onClick={() => setStatus(config.value)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        status === config.value
                          ? config.activeColor
                          : config.color
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusIconColor(
                            config.value,
                            status
                          )}`}
                        >
                          {config.icon}
                        </div>
                        <span
                          className={`text-xs font-medium ${getStatusTextColor(
                            config.value,
                            status
                          )}`}
                        >
                          {config.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formatTimestamp(task.createdAt)}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={updateTask}
                disabled={!title.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
              >
                Aggiorna attività
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

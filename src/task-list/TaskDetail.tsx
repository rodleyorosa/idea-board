import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTask } from "../hooks/useTask";
import { MainContentWrapper } from "../MainContentWrapper";
import type { TaskItemType } from "../types";
import { getStatusColor } from "../utils";
import { formatTimestamp } from "../utils/dateUtils";

export const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, editTask, deleteTask } = useTask();

  const [task, setTask] = useState<TaskItemType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskItemType["status"]>("open");
  const [priority, setPriority] = useState<TaskItemType["priority"]>("media");
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
      <MainContentWrapper title="Task non trovato">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Task non trovato
          </h2>
          <p className="text-gray-600 mb-6">
            Il task che stai cercando non esiste o è stato eliminato.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Torna alla lista
          </button>
        </div>
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper title="Dettaglio Task" fullscreenMobile>
      <div className="bg-white sm:rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          {/* Desktop: bottoni in alto */}
          <div className="hidden sm:flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors cursor-pointer"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Indietro</span>
            </button>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Modifica</span>
                </button>
              ) : null}
              <button
                onClick={handleDelete}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  showDeleteConfirm
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
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
                <span>{showDeleteConfirm ? "Conferma" : "Elimina"}</span>
              </button>
            </div>
          </div>

          {/* Mobile + Desktop: info task */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile: freccia indietro */}
              <button
                onClick={handleBack}
                className="sm:hidden flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex-shrink-0"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
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
                          priority === "bassa"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : priority === "alta"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}
                      >
                        <option value="bassa">↓ Bassa</option>
                        <option value="media">→ Media</option>
                        <option value="alta">↑ Alta</option>
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
                        <option value="open">Aperto</option>
                        <option value="in-progress">In Corso</option>
                        <option value="done">Fatto</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <span
                        className={`px-2 py-0.5 ${
                          priority === "bassa"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : priority === "alta"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        } backdrop-blur-sm rounded-full text-xs font-medium border flex items-center gap-1`}
                      >
                        <span className="font-bold">
                          {priority === "bassa"
                            ? "↓"
                            : priority === "alta"
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

            {/* Mobile: bottoni azioni */}
            <div className="flex sm:hidden items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              ) : null}
              <button
                onClick={handleDelete}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer ${
                  showDeleteConfirm
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
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
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto bg-white">
          <div className="space-y-6 max-w-4xl mx-auto">
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
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium"
                  placeholder="Nome attività"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-800">
                  {task.title}
                </h2>
              )}
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
              {isEditing ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-700"
                  rows={5}
                  placeholder="Aggiungi una descrizione dettagliata..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {task.description || "Nessuna descrizione disponibile"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-4xl mx-auto">
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
            {isEditing && (
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSave}
                  disabled={!title.trim()}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  Aggiorna
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};

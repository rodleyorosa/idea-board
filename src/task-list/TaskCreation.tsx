// src/task-list/TaskCreation.tsx
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { priorityConfig } from "../constants";
import { useTask } from "../hooks/useTask";
import { MainContentWrapper } from "../MainContentWrapper";
import type { TaskPriority } from "../types";

export const TaskCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("media");
  const { addTask } = useTask();
  const navigate = useNavigate();

  const isCreateButtonDisabled = useMemo(() => {
    return !title.trim();
  }, [title]);

  const handleBack = useCallback(() => {
    navigate("/task-list");
  }, [navigate]);

  const saveTask = useCallback(async () => {
    if (!title.trim()) return;

    try {
      await addTask(title, description, priority);
      navigate("/task-list");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }, [addTask, description, navigate, priority, title]);

  return (
    <MainContentWrapper
      title="Nuovo Task"
      className="lg:w-2/3"
      fullscreenMobile
    >
      <div className="bg-white sm:rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer flex-shrink-0"
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
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <span className="text-white font-bold text-xl">
                  Nuova Attività
                </span>
                <p className="text-white/90 text-sm mt-0.5">
                  Crea un nuovo task per il tuo progetto
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
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
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder:text-gray-400"
                placeholder="Es: Implementare nuovo design..."
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
                <span>Descrizione</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none outline-none focus:border-purple-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder:text-gray-400"
                rows={6}
                placeholder="Aggiungi una descrizione dettagliata del task..."
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
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Annulla
            </button>
            <button
              onClick={saveTask}
              disabled={isCreateButtonDisabled}
              title={isCreateButtonDisabled ? "Aggiungi titolo" : "Crea task"}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Crea Task
            </button>
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};

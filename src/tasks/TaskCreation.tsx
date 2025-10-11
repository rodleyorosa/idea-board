import { AlignLeft, ChevronLeft, Tag, Zap } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { priorityConfig } from "../constants";
import { useTask } from "../hooks/useTask";
import { MainContentWrapper } from "../MainContentWrapper";
import type { TaskPriority } from "../types";

export const TaskCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
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
    <MainContentWrapper title="New Task" className="lg:w-2/3" fullscreenMobile>
      <div className="bg-white sm:rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer flex-shrink-0 text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <div>
                <span className="text-white font-bold text-xl">New Task</span>
                <p className="text-white/90 text-sm mt-0.5">
                  Create a new task
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <div className="w-5 h-5 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <Tag className="w-3 h-3 text-indigo-600" />
                </div>
                Title
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder:text-gray-400"
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <AlignLeft className="w-3 h-3 text-purple-600" />
                </div>
                <span>Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none outline-none focus:border-purple-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder:text-gray-400"
                rows={6}
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Zap className="w-3 h-3 text-orange-600" />
                </div>
                <span>Priority</span>
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

        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={saveTask}
              disabled={isCreateButtonDisabled}
              title={isCreateButtonDisabled ? "Add title" : "Create task"}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};

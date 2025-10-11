import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardIcon } from "../assets/icons/tasks/ClipboardIcon";
import { KanbanIcon } from "../assets/icons/tasks/KanbanIcon";
import { MenuIcon } from "../assets/icons/tasks/MenuIcon";
import { PlusIcon } from "../assets/icons/tasks/PlusIcon";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { KanbanBoard } from "./kanban/KanbanBoard";
import { MainContentWrapper } from "../MainContentWrapper";
import { TaskList } from "./list/TaskList";

type ViewMode = "list" | "kanban";

export const TasksView = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    "tasks-view-mode",
    "kanban"
  );

  const createNewTask = useCallback(() => {
    navigate("/task/create");
  }, [navigate]);

  return (
    <MainContentWrapper
      title="Tasks"
      className={`transition-all duration-500 ease-in-out ${
        viewMode === "kanban" ? "max-w-full" : "lg:max-w-2/3"
      } mx-auto`}
    >
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center hidden md:flex">
              <ClipboardIcon />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">View Tasks</h3>
              <p className="text-xs text-gray-500">
                Choose the view you prefer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <MenuIcon />
                <span className="text-sm font-medium hidden sm:inline">
                  List
                </span>
              </button>

              <button
                onClick={() => setViewMode("kanban")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 cursor-pointer ${
                  viewMode === "kanban"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <KanbanIcon />
                <span className="text-sm font-medium hidden sm:inline">
                  Kanban
                </span>
              </button>
            </div>

            <button
              onClick={createNewTask}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <PlusIcon />
              <span className="text-sm font-medium hidden sm:inline">
                New Task
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {viewMode === "list" ? <TaskList /> : <KanbanBoard />}
      </div>
    </MainContentWrapper>
  );
};

import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardIcon } from "../assets/icons/tasks/ClipBoardIcon";
import { KanbanIcon } from "../assets/icons/tasks/KanbanIcon";
import { MenuIcon } from "../assets/icons/tasks/MenuIcon";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTask } from "../hooks/useTask";
import { KanbanBoard } from "../kanban/KanbanBoard";
import { MainContentWrapper } from "../MainContentWrapper";
import { TaskList } from "./TaskList";

type ViewMode = "list" | "kanban";

export const TasksView = () => {
  const navigate = useNavigate();
  const { tasks } = useTask();
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    "tasks-view-mode",
    "kanban"
  );

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      open: tasks.filter((t) => t.status === "open").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      done: tasks.filter((t) => t.status === "done").length,
      highPriority: tasks.filter((t) => t.priority === "alta").length,
    };
  }, [tasks]);

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
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-xs text-gray-600">Totali</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">{stats.open}</div>
            <div className="text-xs text-gray-600">Da Fare</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.inProgress}
            </div>
            <div className="text-xs text-gray-600">In Corso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.done}
            </div>
            <div className="text-xs text-gray-600">Completati</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.highPriority}
            </div>
            <div className="text-xs text-gray-600">Alta Priorità</div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center hidden sm:flex">
              <ClipboardIcon />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Visualizza Tasks</h3>
              <p className="text-xs text-gray-500">
                Scegli la vista che preferisci
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
                  Lista
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
              <span className="text-sm font-medium hidden sm:inline">
                Nuovo Task
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

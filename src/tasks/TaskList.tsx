// src/tasks/TaskList.tsx - Ora è un componente esportabile (senza MainContentWrapper)

import { useTask } from "../hooks/useTask";
import type {
  FilterPriority,
  FilterStatus,
  SortType,
} from "../hooks/useTaskFilters";
import { useTaskFilters } from "../hooks/useTaskFilters";
import type { TaskPriority, TaskStatus } from "../types";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { tasks } = useTask();

  const {
    sortBy,
    filterPriority,
    filterStatus,
    setSortBy,
    setFilterPriority,
    setFilterStatus,
    resetFilters,
    filteredAndSortedTasks,
  } = useTaskFilters(tasks);

  const priorityLabels: Record<TaskPriority | "all", string> = {
    all: "Tutte",
    alta: "Alta",
    media: "Media",
    bassa: "Bassa",
  };

  const statusLabels: Record<TaskStatus | "all", string> = {
    all: "Tutti",
    open: "Aperto",
    "in-progress": "In Corso",
    done: "Fatto",
  };

  const sortLabels: Record<SortType, string> = {
    "date-desc": "Più recenti",
    "date-asc": "Meno recenti",
    priority: "Priorità",
    status: "Stato",
  };

  return (
    <div className="space-y-6">
      {/* Barra filtri e ordinamento */}
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800">Filtra e Ordina</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Priorità
            </label>
            <select
              value={filterPriority}
              onChange={(e) =>
                setFilterPriority(e.target.value as FilterPriority)
              }
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition-all"
            >
              {(["all", "alta", "media", "bassa"] as FilterPriority[]).map(
                (priority) => (
                  <option key={priority} value={priority}>
                    {priorityLabels[priority]}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Stato
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition-all"
            >
              {(["all", "open", "in-progress", "done"] as FilterStatus[]).map(
                (status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Ordina per
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition-all"
            >
              {(
                ["date-desc", "date-asc", "priority", "status"] as SortType[]
              ).map((sort) => (
                <option key={sort} value={sort}>
                  {sortLabels[sort]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(filterPriority !== "all" || filterStatus !== "all") && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-600 font-medium">
              Filtri attivi:
            </span>
            {filterPriority !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                Priorità: {priorityLabels[filterPriority]}
                <button
                  onClick={() => setFilterPriority("all")}
                  className="hover:bg-indigo-200 rounded-full p-0.5 cursor-pointer"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            )}
            {filterStatus !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                Stato: {statusLabels[filterStatus]}
                <button
                  onClick={() => setFilterStatus("all")}
                  className="hover:bg-purple-200 rounded-full p-0.5 cursor-pointer"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer ml-auto"
            >
              Rimuovi tutti
            </button>
          </div>
        )}
      </div>

      {/* Visualizzazione tasks */}
      <div className="flex flex-col gap-4">
        {filteredAndSortedTasks.length > 0 ? (
          <>
            <div className="text-sm text-gray-600 px-2">
              {filteredAndSortedTasks.length}{" "}
              {filteredAndSortedTasks.length === 1
                ? "task trovato"
                : "tasks trovati"}
              {(filterPriority !== "all" || filterStatus !== "all") && (
                <span className="ml-1">({tasks.length} totali)</span>
              )}
            </div>

            {filteredAndSortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Nessun task presente
            </h3>
            <p className="text-gray-500">Inizia creando il tuo primo task!</p>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Nessun task trovato
            </h3>
            <p className="text-gray-500 mb-4">
              Prova a modificare i filtri di ricerca
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer text-sm font-medium"
            >
              Rimuovi filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

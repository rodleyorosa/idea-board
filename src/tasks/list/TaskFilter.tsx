import { SlidersHorizontal, X } from "lucide-react";
import {
  type FilterPriority,
  type FilterStatus,
  type SortType,
} from "../../hooks/useTaskFilters";
import type { TaskPriority, TaskStatus } from "../../types";

interface TaskFilterProps {
  sortBy: SortType;
  filterPriority: FilterPriority;
  filterStatus: FilterStatus;
  setSortBy: (s: SortType) => void;
  setFilterPriority: (priority: FilterPriority) => void;
  setFilterStatus: (status: FilterStatus) => void;
  resetFilters: () => void;
}

export const TaskFilter = ({
  sortBy,
  filterPriority,
  filterStatus,
  setSortBy,
  setFilterPriority,
  setFilterStatus,
  resetFilters,
}: TaskFilterProps) => {
  const priorityLabels: Record<TaskPriority | "all", string> = {
    all: "All",
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  const statusLabels: Record<TaskStatus | "all", string> = {
    all: "All",
    open: "Open",
    "in-progress": "In Progress",
    done: "Done",
  };

  const sortLabels: Record<SortType, string> = {
    "date-desc": "Most recent",
    "date-asc": "Less recent",
    priority: "Priority",
    status: "Status",
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="font-semibold text-gray-800">Filter and sort</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Priority
          </label>
          <select
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(e.target.value as FilterPriority)
            }
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer transition-all"
          >
            {(["all", "high", "medium", "low"] as FilterPriority[]).map(
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
            Status
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
            Sort by
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
            Active filters:
          </span>
          {filterPriority !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              Priority: {priorityLabels[filterPriority]}
              <button
                onClick={() => setFilterPriority("all")}
                className="hover:bg-indigo-200 rounded-full p-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filterStatus !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              Status: {statusLabels[filterStatus]}
              <button
                onClick={() => setFilterStatus("all")}
                className="hover:bg-purple-200 rounded-full p-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer ml-auto"
          >
            Remove all
          </button>
        </div>
      )}
    </div>
  );
};

// src/hooks/useTaskFilters.ts
import { useMemo } from "react";
import type { TaskItemType, TaskPriority, TaskStatus } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export type SortType = "date-desc" | "date-asc" | "priority" | "status";
export type FilterPriority = TaskPriority | "all";
export type FilterStatus = TaskStatus | "all";

interface TaskFilters {
  sortBy: SortType;
  filterPriority: FilterPriority;
  filterStatus: FilterStatus;
}

const DEFAULT_FILTERS: TaskFilters = {
  sortBy: "date-desc",
  filterPriority: "all",
  filterStatus: "all",
};

export function useTaskFilters(tasks: TaskItemType[]) {
  const [filters, setFilters] = useLocalStorage<TaskFilters>(
    "taskListFilters",
    DEFAULT_FILTERS
  );

  const setSortBy = (sortBy: SortType) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const setFilterPriority = (filterPriority: FilterPriority) => {
    setFilters((prev) => ({ ...prev, filterPriority }));
  };

  const setFilterStatus = (filterStatus: FilterStatus) => {
    setFilters((prev) => ({ ...prev, filterStatus }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    if (filters.filterPriority !== "all") {
      result = result.filter(
        (task) => task.priority === filters.filterPriority
      );
    }

    if (filters.filterStatus !== "all") {
      result = result.filter((task) => task.status === filters.filterStatus);
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "date-desc": {
          const aTime = a.createdAt?.toMillis() ?? 0;
          const bTime = b.createdAt?.toMillis() ?? 0;
          return bTime - aTime;
        }
        case "date-asc": {
          const aTime = a.createdAt?.toMillis() ?? 0;
          const bTime = b.createdAt?.toMillis() ?? 0;
          return aTime - bTime;
        }
        case "priority": {
          const priorityOrder = { alta: 0, media: 1, bassa: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        case "status": {
          const statusOrder = { open: 0, "in-progress": 1, done: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        }
        default:
          return 0;
      }
    });

    return result;
  }, [tasks, filters]);

  return {
    sortBy: filters.sortBy,
    filterPriority: filters.filterPriority,
    filterStatus: filters.filterStatus,
    setSortBy,
    setFilterPriority,
    setFilterStatus,
    resetFilters,
    filteredAndSortedTasks,
  };
}

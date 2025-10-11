import { ClipboardList, Search } from "lucide-react";
import { useTask } from "../../hooks/useTask";
import { useTaskFilters } from "../../hooks/useTaskFilters";
import { TaskFilter } from "./TaskFilter";
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

  return (
    <div className="space-y-6">
      <TaskFilter
        sortBy={sortBy}
        filterPriority={filterPriority}
        filterStatus={filterStatus}
        setSortBy={setSortBy}
        setFilterPriority={setFilterPriority}
        setFilterStatus={setFilterStatus}
        resetFilters={resetFilters}
      />
      <div className="flex flex-col gap-4">
        {filteredAndSortedTasks.length > 0 ? (
          <>
            <div className="text-sm text-gray-600 px-2">
              {filteredAndSortedTasks.length}{" "}
              {filteredAndSortedTasks.length === 1
                ? "task found"
                : "tasks found"}
              {(filterPriority !== "all" || filterStatus !== "all") && (
                <span className="ml-1">({tasks.length} total)</span>
              )}
            </div>

            {filteredAndSortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No tasks present
            </h3>
            <p className="text-gray-500">
              Get started by creating your first task!
            </p>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500 mb-4">
              Try changing your search filters
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer text-sm font-medium"
            >
              Remove filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

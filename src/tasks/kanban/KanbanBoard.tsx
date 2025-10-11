import { Clock, GripVertical, Inbox } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../hooks/useTask";
import type { TaskItemType, TaskStatus } from "../../types";
import { getPriorityConfig } from "../../utils";

const COLUMNS: Array<{
  id: TaskStatus;
  title: string;
  color: string;
  icon: string;
}> = [
  {
    id: "open",
    title: "Da Fare",
    color: "bg-gray-50 border-gray-200",
    icon: "📋",
  },
  {
    id: "in-progress",
    title: "In Corso",
    color: "bg-blue-50 border-blue-200",
    icon: "⚡",
  },
  {
    id: "done",
    title: "Completato",
    color: "bg-green-50 border-green-200",
    icon: "✅",
  },
];

export const KanbanBoard = () => {
  const { tasks, editTask } = useTask();
  const navigate = useNavigate();
  const [draggedTask, setDraggedTask] = useState<TaskItemType | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = useState<TaskStatus | null>(
    null
  );

  const handleDragStart = useCallback((task: TaskItemType) => {
    setDraggedTask(task);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, status: TaskStatus) => {
      e.preventDefault();
      setDraggedOverColumn(status);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setDraggedOverColumn(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
    setDraggedOverColumn(null);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent, newStatus: TaskStatus) => {
      e.preventDefault();

      if (!draggedTask || draggedTask.status === newStatus) {
        setDraggedTask(null);
        setDraggedOverColumn(null);
        return;
      }

      try {
        await editTask(
          draggedTask.id,
          draggedTask.title,
          draggedTask.description,
          newStatus,
          draggedTask.priority
        );
      } catch (error) {
        console.error("Error updating task:", error);
      } finally {
        setDraggedTask(null);
        setDraggedOverColumn(null);
      }
    },
    [draggedTask, editTask]
  );

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => {
      return tasks.filter((task) => task.status === status);
    },
    [tasks]
  );

  const openTaskDetail = useCallback(
    (taskId: string) => {
      navigate(`/task/${taskId}`);
    },
    [navigate]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {COLUMNS.map((column) => {
        const columnTasks = getTasksByStatus(column.id);
        const isDraggedOver = draggedOverColumn === column.id;

        return (
          <div key={column.id} className="flex flex-col">
            <div className={`${column.color} rounded-t-xl border-2 p-4`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{column.icon}</span>
                <h3 className="font-bold text-gray-800">{column.title}</h3>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-semibold text-gray-600">
                  {columnTasks.length}
                </span>
              </div>
            </div>

            <div
              className={`flex-1 ${
                column.color
              } rounded-b-xl border-2 border-t-0 p-4 min-h-[500px] max-h-[calc(100vh-300px)] overflow-y-auto transition-all duration-200 ${
                isDraggedOver ? "ring-2 ring-indigo-400 ring-offset-1" : ""
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="space-y-3">
                {columnTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Inbox className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      {isDraggedOver ? "Rilascia qui" : "Nessun task"}
                    </p>
                  </div>
                ) : (
                  columnTasks.map((task) => {
                    const priorityConfig = getPriorityConfig(task.priority);
                    const isDragging = draggedTask?.id === task.id;

                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => handleDragStart(task)}
                        onDragEnd={handleDragEnd}
                        onClick={() => openTaskDetail(task.id)}
                        className={`bg-white rounded-lg p-4 shadow-sm border-2 border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing select-none group ${
                          isDragging ? "opacity-40 scale-98" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-150 flex-1 line-clamp-2">
                            {task.title}
                          </h4>
                          <div
                            className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-semibold ${priorityConfig.color}`}
                            title={`Priorità ${priorityConfig.label}`}
                          >
                            {priorityConfig.icon}
                          </div>
                        </div>

                        {task.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-3 whitespace-pre-wrap">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              {task.createdAt
                                ?.toDate()
                                .toLocaleDateString("it-IT")}
                            </span>
                          </div>
                          <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

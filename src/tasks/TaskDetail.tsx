import { AlignLeft, Tag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTask } from "../hooks/useTask";
import { useTaskForm } from "../hooks/useTaskForm";
import { MainContentWrapper } from "../MainContentWrapper";
import type { TaskItemType } from "../types";
import { formatTimestamp } from "../utils/dateUtils";
import { TaskField } from "./components/TaskField";
import { TaskFooter } from "./components/TaskFooter";
import { TaskHeader } from "./components/TaskHeader";
import { TaskInput } from "./components/TaskInput";
import { TaskTextarea } from "./components/TaskTextarea";
import { TaskNotFound } from "./TaskNotFound";

export const TaskDetail = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { tasks, editTask, deleteTask } = useTask();

  const [task, setTask] = useState<TaskItemType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    title,
    description,
    priority,
    status,
    isSaveDisabled,
    setTitle,
    setDescription,
    setPriority,
    setStatus,
    updateFromTask,
  } = useTaskForm();

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
      updateFromTask(foundTask);
    }
  }, [taskId, tasks, updateFromTask]);

  const handleBack = useCallback(() => {
    navigate("/task-list");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    if (task) {
      updateFromTask(task);
    }
    setIsEditing(false);
  }, [task, updateFromTask]);

  const handleSave = useCallback(async () => {
    if (!task || isSaveDisabled) return;

    try {
      await editTask(task.id, title, description, status, priority);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }, [task, title, description, status, priority, editTask, isSaveDisabled]);

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
      <MainContentWrapper title="Task non trovato" className="lg:w-2/3">
        <TaskNotFound onClick={handleBack} />
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper
      title="Task Details"
      className="lg:w-2/3"
      fullscreenMobile
    >
      <div className="bg-white sm:rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <TaskHeader
          title="Task Details"
          isEditing={isEditing}
          showDeleteConfirm={showDeleteConfirm}
          status={status}
          priority={priority}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
        />

        <div className="p-6 flex-1 overflow-y-auto bg-white">
          <div className="space-y-6">
            <TaskField
              icon={Tag}
              iconBgColor="bg-indigo-100"
              iconColor="text-indigo-600"
              label="Title"
              required
            >
              {isEditing ? (
                <TaskInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task name"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-800">
                  {task.title}
                </h2>
              )}
            </TaskField>

            <TaskField
              icon={AlignLeft}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
              label="Description"
            >
              {isEditing ? (
                <TaskTextarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Add a detailed description..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {task.description || "No description available"}
                </p>
              )}
            </TaskField>
          </div>
        </div>

        <TaskFooter
          timestamp={formatTimestamp(task.createdAt)}
          isEditing={isEditing}
          isSaveDisabled={isSaveDisabled}
          onCancel={isEditing ? handleCancelEdit : handleBack}
          onSave={handleSave}
          saveButtonText="Update"
          cancelButtonText="Cancel"
        />
      </div>
    </MainContentWrapper>
  );
};

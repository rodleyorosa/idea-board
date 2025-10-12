import { useCallback, useMemo, useState } from "react";
import type { TaskItemType, TaskPriority } from "../types";

interface UseTaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: TaskPriority;
  initialStatus?: TaskItemType["status"];
}

export function useTaskForm({
  initialTitle = "",
  initialDescription = "",
  initialPriority = "medium" as TaskPriority,
  initialStatus = "open" as TaskItemType["status"],
}: UseTaskFormProps = {}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState<TaskPriority>(initialPriority);
  const [status, setStatus] = useState<TaskItemType["status"]>(initialStatus);

  const isSaveDisabled = useMemo(() => {
    return !title.trim();
  }, [title]);

  const resetForm = useCallback(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPriority(initialPriority);
    setStatus(initialStatus);
  }, [initialTitle, initialDescription, initialPriority, initialStatus]);

  const updateFromTask = useCallback((task: TaskItemType) => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setStatus(task.status);
  }, []);

  return {
    title,
    description,
    priority,
    status,
    isSaveDisabled,
    setTitle,
    setDescription,
    setPriority,
    setStatus,
    resetForm,
    updateFromTask,
  };
}

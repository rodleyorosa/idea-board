import { useCallback, useMemo, useState } from "react";
import { DEFAULT_PRIORITY, DEFAULT_STATUS } from "../constants";
import type { TaskItemType, TaskPriority } from "../types";

export function useTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(DEFAULT_PRIORITY);
  const [status, setStatus] = useState<TaskItemType["status"]>(DEFAULT_STATUS);

  const isSaveDisabled = useMemo(() => {
    return !title.trim();
  }, [title]);

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
    updateFromTask,
  };
}

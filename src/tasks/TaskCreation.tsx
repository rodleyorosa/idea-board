import { AlignLeft, Tag } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../hooks/useTask";
import { useTaskForm } from "../hooks/useTaskForm";
import { MainContentWrapper } from "../MainContentWrapper";
import { PrioritySelector } from "./components/PrioritySelector";
import { TaskField } from "./components/TaskField";
import { TaskFooter } from "./components/TaskFooter";
import { TaskHeader } from "./components/TaskHeader";
import { TaskInput } from "./components/TaskInput";
import { TaskTextarea } from "./components/TaskTextarea";

export const TaskCreation = () => {
  const navigate = useNavigate();
  const { addTask } = useTask();
  const {
    title,
    description,
    priority,
    isSaveDisabled,
    setTitle,
    setDescription,
    setPriority,
  } = useTaskForm();

  const handleBack = useCallback(() => {
    navigate("/task-list");
  }, [navigate]);

  const handleSave = useCallback(async () => {
    if (isSaveDisabled) return;

    try {
      await addTask(title, description, priority);
      navigate("/task-list");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }, [addTask, description, navigate, priority, title, isSaveDisabled]);

  return (
    <MainContentWrapper title="New Task" className="lg:w-2/3" fullscreenMobile>
      <div className="bg-white sm:rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <TaskHeader
          title="New Task"
          subtitle="Create a new task"
          onBack={handleBack}
        />
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            <TaskField
              icon={Tag}
              iconBgColor="bg-indigo-100"
              iconColor="text-indigo-600"
              label="Title"
              required
            >
              <TaskInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </TaskField>

            <TaskField
              icon={AlignLeft}
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
              label="Description"
            >
              <TaskTextarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </TaskField>

            <PrioritySelector value={priority} onChange={setPriority} />
          </div>
        </div>
        <TaskFooter
          isEditing
          isSaveDisabled={isSaveDisabled}
          onCancel={handleBack}
          onSave={handleSave}
          saveButtonText="Create"
          cancelButtonText="Cancel"
        />
      </div>
    </MainContentWrapper>
  );
};

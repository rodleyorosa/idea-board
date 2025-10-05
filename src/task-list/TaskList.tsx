import { useCallback, useState } from "react";
import { useTask } from "../hooks/useTask";
import { MainContentWrapper } from "../MainContentWrapper";
import { CreationTask } from "./CreationTask";
import { NewTask } from "./NewTask";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useTask();

  const openCreateTask = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <MainContentWrapper title="Task List" className="lg:w-2/3">
      <CreationTask isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <NewTask openCreateTask={openCreateTask} />
      <div className="flex flex-col gap-4">
        {tasks.map((task) => {
          return <TaskItem key={task.id} task={task} />;
        })}
      </div>
    </MainContentWrapper>
  );
};

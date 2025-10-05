import { useCallback, useState } from "react";
import { useTodoList } from "../hooks/useTodoList";
import { MainContentWrapper } from "../MainContentWrapper";
import { CreationTask } from "./CreationTask";
import { NewTask } from "./NewTask";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useTodoList();

  const openCreateTask = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <MainContentWrapper title="Todo List" className="lg:w-2/3">
      <CreationTask isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <NewTask openCreateTask={openCreateTask} />
      <div className="flex flex-col gap-4">
        {tasks.map((task) => {
          return <TodoItem key={task.id} task={task} />;
        })}
      </div>
    </MainContentWrapper>
  );
};

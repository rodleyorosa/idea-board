import { useCallback, useState } from "react";
import { Checkbox } from "../assets/Checkbox";
import type { TodoItemType } from "../types";
import { TodoDetailModal } from "./TodoDetailModal";

interface TodoItemProps {
  key: React.Key;
  todo: TodoItemType;
}

export const TodoItem = ({ key, todo }: TodoItemProps) => {
  const [isTodoDetailModalOpened, setIsTodoDetailModalOpened] = useState(false);

  const openTodoDetailModal = useCallback(() => {
    setIsTodoDetailModalOpened(true);
    // block the scroll when the modal is opened
    document.body.style.overflow = "hidden";
  }, []);

  const closeTodoDetailModal = useCallback(() => {
    setIsTodoDetailModalOpened(false);
    // unblock the scroll when the modal is closed
    document.body.style.overflow = "unset";
  }, []);

  return (
    <>
      <TodoDetailModal
        title={todo.title}
        description={todo.description}
        isTodoDetailModalOpened={isTodoDetailModalOpened}
        closeTodoDetailModal={closeTodoDetailModal}
      />
      <div
        key={key}
        onClick={openTodoDetailModal}
        className="border-b border-gray-200 pb-2 hover:bg-gray-50 px-2 py-2 rounded transition-colors duration-200 cursor-pointer"
      >
        <div className="flex gap-3 items-start">
          <Checkbox />
          <div className="flex flex-col leading-none gap-1 flex-1">
            <p className="text-gray-900 font-medium">{todo.title}</p>
            <p className="text-sm text-gray-500">{todo.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

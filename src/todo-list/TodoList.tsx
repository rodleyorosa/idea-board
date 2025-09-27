import { MainContentWrapper } from "../MainContentWrapper";

export const TodoList = () => {
  const todoList = [
    {
      title: "title",
      description: "description",
    },
    {
      title: "title",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    },
    {
      title: "title",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
  ];

  return (
    <MainContentWrapper title="Todo App" className="lg:w-2/3">
      <div className="flex flex-col gap-4">
        {todoList.map((todo,key) => {
          return (
            <div key={key} className="flex gap-2 border-b border-gray-300 pb-4">
              <div
                className={`relative w-5 h-5 border rounded-full transition-all duration-200 flex-shrink-0 border-gray-400`}
              >
                <svg
                  className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-none gap-1">
                <p>{todo.title}</p>
                <p className="text-xs text-gray-500">{todo.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </MainContentWrapper>
  );
};

import { NavLink } from "react-router-dom";
import { CloseMenu } from "./assets/CloseMenu";
import { useSidebar } from "./hooks/useSidebar";

export const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const items = [
    { title: "Sticky Wall", path: "/sticky-wall" },
    { title: "Todo List", path: "/todo-list" },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        w-80 lg:w-64
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold">Idea Board</h2>
        <CloseMenu onClick={closeSidebar} />
      </div>
      <nav className="px-4">
        <ul className="space-y-3">
          {items.map((item, key) => {
            return (
              <NavLink
                key={key}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition-colors ${
                    isActive ? "bg-gray-100" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={closeSidebar}
              >
                {item.title}
              </NavLink>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

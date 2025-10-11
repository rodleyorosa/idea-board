import { LogOut, X } from "lucide-react";
import { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useSidebar } from "./hooks/useSidebar";

export const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const items = [
    { title: "Sticky Wall", path: "/sticky-wall" },
    { title: "Tasks", path: "/tasks" },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [logout, navigate]);

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        w-80 lg:w-64 flex flex-col justify-between
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold">Idea Board</h2>
          <button
            onClick={closeSidebar}
            className="cursor-pointer p-1 hover:bg-gray-100 rounded lg:hidden"
          >
            <X className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
        <nav className="px-4">
          <ul className="space-y-3">
            <NavLink
              key={0}
              to={"/dashboard"}
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors ${
                  isActive ? "bg-gray-100" : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={closeSidebar}
            >
              Dashboard
            </NavLink>
            <hr className="text-gray-300" />
            {items.map((item, key) => {
              return (
                <NavLink
                  key={key}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded transition-colors ${
                      isActive
                        ? "bg-gray-100"
                        : "text-gray-700 hover:bg-gray-100"
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
      <button
        onClick={handleLogout}
        className="cursor-pointer px-4 py-3 m-4 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
};

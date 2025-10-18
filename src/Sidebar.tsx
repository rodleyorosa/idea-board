import {
  CheckSquare,
  LayoutDashboard,
  LogOut,
  StickyNote,
  X,
} from "lucide-react";
import { useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useSidebar } from "./hooks/useSidebar";

export const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Sticky Wall",
      path: "/sticky-wall",
      icon: StickyNote,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [logout, navigate]);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userInitial = (
    user?.displayName?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          w-80 lg:w-64 flex flex-col
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Idea Board
              </h2>
            </div>
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {user && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-indigo-500/30">
                  {userInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? `${item.bgColor} ${item.color} shadow-sm`
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`${
                            isActive
                              ? item.color
                              : "text-gray-400 group-hover:text-gray-600"
                          } transition-colors`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`font-medium ${
                            isActive && "font-semibold"
                          }`}
                        >
                          {item.title}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

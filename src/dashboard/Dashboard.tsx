import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { StickyWallIcon } from "../assets/icons/dashboard/StickyWallIcon";
import { TaskListIcon } from "../assets/icons/dashboard/TaskListIcon";
import { UserIcon } from "../assets/icons/dashboard/UserIcon";
import { useAuth } from "../hooks/useAuth";
import { useNote } from "../hooks/useNote";
import { useTask } from "../hooks/useTask";
import { MainContentWrapper } from "../MainContentWrapper";

export default function Dashboard() {
  const { user } = useAuth();
  const { notes } = useNote(user?.uid || null);
  const { tasks } = useTask();

  const tasksByStatus = useMemo(() => {
    return {
      open: tasks.filter((t) => t.status === "open").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      done: tasks.filter((t) => t.status === "done").length,
    };
  }, [tasks]);

  const stats = useMemo(
    () => [
      {
        id: "sticky-wall",
        path: "/sticky-wall",
        label: "Sticky Wall",
        count: notes.length,
        itemName: notes.length === 1 ? "nota" : "note",
        icon: <StickyWallIcon />,
        bgColor: "bg-blue-100",
      },
      {
        id: "tasks",
        path: "/tasks",
        label: "Tasks",
        count: tasks.length,
        itemName: tasks.length === 1 ? "task" : "tasks",
        icon: <TaskListIcon />,
        bgColor: "bg-indigo-100",
        subtitle: `${tasksByStatus.open} da fare · ${tasksByStatus.inProgress} in corso · ${tasksByStatus.done} fatti`,
      },
    ],
    [notes.length, tasks.length, tasksByStatus]
  );

  return (
    <MainContentWrapper title="Dashboard" className="lg:w-2/3">
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <UserIcon />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900">Benvenuto!</h2>
              <p className="text-gray-600 text-sm sm:text-base truncate">
                {user?.email}
              </p>
              <p className="text-gray-400 text-xs font-mono truncate">
                ID: {user?.uid}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat) => (
            <NavLink
              key={stat.id}
              to={stat.path}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-indigo-200 group"
            >
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${stat.bgColor} rounded-lg p-3 group-hover:scale-110 transition-transform`}
                >
                  {stat.icon}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stat.count} {stat.itemName}
                  </p>
                  {stat.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Azioni Rapide
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <NavLink
              to="/note/create"
              className="bg-white rounded-lg p-4 hover:shadow-md transition-all border border-gray-200 hover:border-blue-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  Nuova Nota
                </span>
              </div>
            </NavLink>

            <NavLink
              to="/task/create"
              className="bg-white rounded-lg p-4 hover:shadow-md transition-all border border-gray-200 hover:border-indigo-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                  Nuovo Task
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
}

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
        id: "task-list",
        path: "/task-list",
        label: "Task List",
        count: tasks.length,
        itemName: tasks.length === 1 ? "task" : "tasks",
        icon: <TaskListIcon />,
        bgColor: "bg-green-100",
      },
    ],
    [notes.length, tasks.length]
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
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.bgColor} rounded-lg p-3`}>
                  {stat.icon}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stat.count} {stat.itemName}
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </MainContentWrapper>
  );
}

import { CheckSquare, StickyNote, User } from "lucide-react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNote } from "../hooks/useNote";
import { useTask } from "../hooks/useTask";
import { MainContentWrapper } from "../MainContentWrapper";

export default function Dashboard() {
  const { user } = useAuth();
  const { notes } = useNote();
  const { tasks } = useTask();

  const stats = useMemo(
    () => [
      {
        id: "sticky-wall",
        path: "/sticky-wall",
        label: "Sticky Wall",
        count: notes.length,
        itemName: notes.length === 1 ? "note" : "notes",
        icon: StickyNote,
        bgGradient: "from-blue-500 to-cyan-500",
        bgLight: "bg-blue-50",
        iconColor: "text-blue-600",
        hoverBorder: "hover:border-blue-300",
      },
      {
        id: "tasks",
        path: "/tasks",
        label: "Tasks",
        count: tasks.length,
        itemName: tasks.length === 1 ? "task" : "tasks",
        icon: CheckSquare,
        bgGradient: "from-green-500 to-emerald-500",
        bgLight: "bg-green-50",
        iconColor: "text-green-600",
        hoverBorder: "hover:border-green-300",
      },
    ],
    [notes.length, tasks.length]
  );

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  return (
    <MainContentWrapper title="Dashboard" className="lg:w-2/3">
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {displayName}!
              </h2>
              <p className="text-gray-600 text-sm sm:text-base truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <NavLink
                key={stat.id}
                to={stat.path}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-indigo-200 group"
              >
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 ${stat.bgLight} rounded-lg p-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stat.count} {stat.itemName}
                    </p>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </MainContentWrapper>
  );
}

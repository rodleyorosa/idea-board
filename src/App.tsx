import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import Signup from "./authentication/Signup";
import Dashboard from "./dashboard/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { useSidebar } from "./hooks/useSidebar";
import { Sidebar } from "./Sidebar";
import { StickyWall } from "./sticky-wall/StickyWall";
import { TaskCreation } from "./task-list/TaskCreation";
import { TaskDetail } from "./task-list/TaskDetail";
import { TaskList } from "./task-list/TaskList";

const App = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={closeSidebar}
        />
      )}
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/sticky-wall"
            element={
              <PrivateRoute>
                <StickyWall />
              </PrivateRoute>
            }
          />
          <Route
            path="/task-list"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />
          <Route
            path="/task/create"
            element={
              <PrivateRoute>
                <TaskCreation />
              </PrivateRoute>
            }
          />
          <Route
            path="/task/:taskId"
            element={
              <PrivateRoute>
                <TaskDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

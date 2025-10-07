import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./authentication/Login";
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
          onClick={closeSidebar}
        />
      )}
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sticky-wall" element={<StickyWall />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/task/create" element={<TaskCreation />} />
          <Route path="/task/:taskId" element={<TaskDetail />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

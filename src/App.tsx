import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./authentication/Dashboard";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import Signup from "./authentication/Signup";
import { useAuth } from "./hooks/useAuth";
import { useSidebar } from "./hooks/useSidebar";
import { Sidebar } from "./Sidebar";
import { StickyWall } from "./sticky-wall/StickyWall";
import { TodoList } from "./todo-list/TodoList";

const App = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const { currentUser } = useAuth();

  return (
    <div className="flex h-screen">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}
      {currentUser && <Sidebar />}
      <div className="flex-1">
        <Routes>
          {!currentUser && (
            <>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {currentUser && (
            <>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/sticky-wall" element={<StickyWall />} />
              <Route path="/todo-list" element={<TodoList />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;

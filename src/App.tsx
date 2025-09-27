import { Navigate, Route, Routes } from "react-router-dom";
import { useSidebar } from "./hooks/useSidebar";
import { Sidebar } from "./Sidebar";
import { StickyWall } from "./sticky-wall/StickyWall";
import { TodoApp } from "./todo-app/TodoApp";

const App = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  return (
    <div className="flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/sticky-wall" replace />}
        />
        <Route path="/sticky-wall" element={<StickyWall />} />
        <Route path="/todo-app" element={<TodoApp />} />
      </Routes>
    </div>
  );
};

export default App;

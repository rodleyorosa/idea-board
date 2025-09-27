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
          path="/idea-board"
          element={<Navigate to="/idea-board/sticky-wall" replace />}
        />
        <Route path="/idea-board/sticky-wall" element={<StickyWall />} />
        <Route path="/idea-board/todo-app" element={<TodoApp />} />
      </Routes>
    </div>
  );
};

export default App;

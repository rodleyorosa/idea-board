import { CloseMenu } from "./assets/CloseMenu";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const items = ["Sticky Wall", "Todo App"];
  return (
    <div
      className={`
        fixed top-0 left-0 h-screen bg-white shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        w-80 lg:w-64
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Menu</h2>
        <CloseMenu onClick={toggleSidebar} />
      </div>
      <nav className="p-4">
        <ul className="space-y-3">
          {items.map((item) => {
            return (
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

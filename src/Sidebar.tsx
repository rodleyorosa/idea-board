import { CloseMenu } from "./assets/CloseMenu";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  return (
    <div
      className={`
        fixed lg:static top-0 left-0 h-screen lg:h-auto bg-white shadow-lg z-50 lg:z-auto
        transform lg:transform-none transition-transform duration-300 ease-in-out min-h-screen
        w-80 lg:w-64 lg:flex-shrink-0
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
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Note
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Categorie
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Impostazioni
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Aiuto
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

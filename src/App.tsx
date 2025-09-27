import { useCallback, useState } from "react";
import { Hamburger } from "./assets/Hamburger";
import { NewNote } from "./NewNote";
import { Sidebar } from "./Sidebar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((state) => !state);
  }, []);

  const stickWalls = [
    {
      id: 1,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 2,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 3,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 4,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 5,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 6,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
    {
      id: 7,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    },
  ];

  return (
    <div className="flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col gap-6 p-6 lg:ml-64">
        <div className="flex items-center gap-3">
          <Hamburger onClick={toggleSidebar} />
          <h1 className="text-3xl font-bold">Sticky Wall</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <NewNote />
          {stickWalls.map((item) => {
            return (
              <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div>{item.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;

import { useCallback, useState } from "react";
import { Hamburger } from "./assets/Hamburger";
import { Sidebar } from "./Sidebar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((state) => !state);
  }, []);

  return (
    <div className="flex p-6 gap-6">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Hamburger onClick={toggleSidebar} />
          <h1 className="text-3xl font-bold">Sticky Wall</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-yellow-100 p-4 rounded-md shadow-m sm:aspect-squared">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          {/*  */}
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
          <div className="bg-pink-100 p-4 rounded-md shadow-md sm:aspect-square">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec qu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

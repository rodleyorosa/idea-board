import { useCallback, useState } from "react";
import { SidebarContext } from "../hooks/useSidebar";

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((state) => !state);
  }, []);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

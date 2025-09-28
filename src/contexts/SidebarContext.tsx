import { useCallback, useState } from "react";
import { SidebarContext } from "../hooks/useSidebar";

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
    // block the scroll when the sidebar is opened
    document.body.style.overflow = "hidden";
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    // unblock the scroll when the sidebar is closed
    document.body.style.overflow = "unset";
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

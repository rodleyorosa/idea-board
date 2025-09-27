import { createContext, useContext } from "react";
import { type SidebarContextType } from "../contexts/types";

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

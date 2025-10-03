import { createContext, useContext } from "react";
import type { AuthContextType } from "../contexts/types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContext");
  }
  return context;
};

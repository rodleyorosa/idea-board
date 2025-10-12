import { render, type RenderOptions } from "@testing-library/react";
import type { User } from "firebase/auth";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import type { AuthContextType, SidebarContextType } from "../contexts/types";
import { AuthContext } from "../hooks/useAuth";
import { SidebarContext } from "../hooks/useSidebar";

export const mockUser: Partial<User> = {
  uid: "test-uid",
  email: "test@example.com",
  displayName: "Test User",
};

const mockAuthContext: AuthContextType = {
  user: mockUser as User,
  signup: vi.fn(),
  login: vi.fn(),
  loginWithGoogle: vi.fn(),
  logout: vi.fn(),
};

const mockSidebarContext: SidebarContextType = {
  isSidebarOpen: false,
  openSidebar: vi.fn(),
  closeSidebar: vi.fn(),
};

interface AllProvidersProps {
  children: React.ReactNode;
  authValue?: Partial<AuthContextType>;
  sidebarValue?: Partial<SidebarContextType>;
}

function AllProviders({
  children,
  authValue = {},
  sidebarValue = {},
}: AllProvidersProps) {
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...mockAuthContext, ...authValue }}>
        <SidebarContext.Provider
          value={{ ...mockSidebarContext, ...sidebarValue }}
        >
          {children}
        </SidebarContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  authValue?: Partial<AuthContextType>;
  sidebarValue?: Partial<SidebarContextType>;
}

function customRender(ui: React.ReactElement, options?: CustomRenderOptions) {
  const { authValue, sidebarValue, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders authValue={authValue} sidebarValue={sidebarValue}>
        {children}
      </AllProviders>
    ),
    ...renderOptions,
  });
}

export * from "@testing-library/react";
export { mockAuthContext, mockSidebarContext, customRender as render };

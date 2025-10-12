import userEvent from "@testing-library/user-event";
import type { User } from "firebase/auth";
import type { NavLinkProps } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";
import { render, screen } from "./test/test-utils";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    NavLink: ({ children, to, onClick, className }: NavLinkProps) => {
      const isActive = false;

      const navLinkProps = {
        isActive,
        isPending: false,
        isTransitioning: false,
      };

      const finalClassName =
        typeof className === "function" ? className(navLinkProps) : className;

      const content =
        typeof children === "function" ? children(navLinkProps) : children;

      return (
        <a href={to as string} onClick={onClick} className={finalClassName}>
          {content}
        </a>
      );
    },
  };
});

describe("Sidebar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render sidebar with title", () => {
    render(<Sidebar />);
    expect(screen.getByText("Idea Board")).toBeTruthy();
  });

  it("should display user information", () => {
    render(<Sidebar />, {
      authValue: {
        user: {
          uid: "test-uid",
          email: "test@example.com",
          displayName: "Test User",
        } as User,
      },
    });

    expect(screen.getByText("Test User")).toBeTruthy();
    expect(screen.getByText("test@example.com")).toBeTruthy();
  });

  it("should display user initial in avatar", () => {
    render(<Sidebar />, {
      authValue: {
        user: {
          uid: "test-uid",
          email: "test@example.com",
          displayName: "John Doe",
        } as User,
      },
    });

    expect(screen.getByText("J")).toBeTruthy();
  });

  it("should render all menu items", () => {
    render(<Sidebar />);

    expect(screen.getByText("Dashboard")).toBeTruthy();
    expect(screen.getByText("Sticky Wall")).toBeTruthy();
    expect(screen.getByText("Tasks")).toBeTruthy();
  });

  it("should render logout button", () => {
    render(<Sidebar />);
    expect(screen.getByText("Logout")).toBeTruthy();
  });

  it("should call logout and navigate on logout button click", async () => {
    const mockLogout = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<Sidebar />, {
      authValue: { logout: mockLogout },
    });

    const logoutButton = screen.getByText("Logout");
    await user.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should close sidebar when menu item is clicked", async () => {
    const mockCloseSidebar = vi.fn();
    const user = userEvent.setup();

    render(<Sidebar />, {
      sidebarValue: {
        isSidebarOpen: true,
        closeSidebar: mockCloseSidebar,
      },
    });

    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    await user.click(dashboardLink);

    expect(mockCloseSidebar).toHaveBeenCalled();
  });

  it("should show sidebar when isSidebarOpen is true", () => {
    const { container } = render(<Sidebar />, {
      sidebarValue: { isSidebarOpen: true },
    });

    const sidebar = container.querySelector(".translate-x-0");
    expect(sidebar).toBeTruthy();
  });

  it("should hide sidebar when isSidebarOpen is false on mobile", () => {
    const { container } = render(<Sidebar />, {
      sidebarValue: { isSidebarOpen: false },
    });

    const sidebar = container.querySelector(".-translate-x-full");
    expect(sidebar).toBeTruthy();
  });

  it("should render close button on mobile", () => {
    render(<Sidebar />, {
      sidebarValue: { isSidebarOpen: true },
    });

    const closeButton = screen.getByRole("button", { name: "" });
    expect(closeButton).toBeTruthy();
  });

  it("should call closeSidebar when close button is clicked", async () => {
    const mockCloseSidebar = vi.fn();
    const user = userEvent.setup();

    render(<Sidebar />, {
      sidebarValue: {
        isSidebarOpen: true,
        closeSidebar: mockCloseSidebar,
      },
    });

    const closeButtons = screen.getAllByRole("button");
    const closeButton = closeButtons[0]; // First button should be the close button

    await user.click(closeButton);
    expect(mockCloseSidebar).toHaveBeenCalled();
  });

  it("should display email as fallback when displayName is not available", () => {
    render(<Sidebar />, {
      authValue: {
        user: {
          uid: "test-uid",
          email: "john@example.com",
          displayName: null,
        } as User,
      },
    });

    expect(screen.getByText("john")).toBeTruthy();
  });
});

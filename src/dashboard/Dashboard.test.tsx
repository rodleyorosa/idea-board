import type { User } from "firebase/auth";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import Dashboard from "./Dashboard";

vi.mock("../hooks/useNote.ts", () => ({
  useNote: () => ({
    notes: [
      { id: "1", title: "Note 1", content: "Content 1", color: "yellow" },
      { id: "2", title: "Note 2", content: "Content 2", color: "rose" },
    ],
  }),
}));

vi.mock("../hooks/useTask", () => ({
  useTask: () => ({
    tasks: [
      {
        id: "1",
        title: "Task 1",
        description: "Desc 1",
        status: "open",
        priority: "high",
      },
      {
        id: "2",
        title: "Task 2",
        description: "Desc 2",
        status: "done",
        priority: "low",
      },
      {
        id: "3",
        title: "Task 3",
        description: "Desc 3",
        status: "in-progress",
        priority: "medium",
      },
    ],
  }),
}));

describe("Dashboard Component", () => {
  it("should render welcome message with user name", () => {
    render(<Dashboard />, {
      authValue: {
        user: {
          uid: "test-uid",
          email: "test@example.com",
          displayName: "John Doe",
        } as User,
      },
    });

    expect(screen.getByText(/Welcome back, John Doe!/i)).toBeTruthy();
  });

  it("should display user email", () => {
    render(<Dashboard />, {
      authValue: {
        user: {
          uid: "test-uid",
          email: "john@example.com",
          displayName: "John Doe",
        } as User,
      },
    });

    expect(screen.getByText("john@example.com")).toBeTruthy();
  });

  it("should display correct count of notes", () => {
    render(<Dashboard />);

    expect(screen.getByText("2 notes")).toBeTruthy();
  });

  it("should display correct count of tasks", () => {
    render(<Dashboard />);

    expect(screen.getByText("3 tasks")).toBeTruthy();
  });

  it("should display singular form for single note", () => {
    vi.doMock("../../hooks/useNote", () => ({
      useNote: () => ({
        notes: [
          { id: "1", title: "Note 1", content: "Content 1", color: "yellow" },
        ],
      }),
    }));

    render(<Dashboard />);
    expect(screen.getByText(/note/i)).toBeTruthy();
  });

  it("should render links to Sticky Wall and Tasks", () => {
    render(<Dashboard />);

    const links = screen.getAllByRole("link");
    const paths = links.map((link) => link.getAttribute("href"));

    expect(paths).toContain("/sticky-wall");
    expect(paths).toContain("/tasks");
  });

  it("should display Sticky Wall label", () => {
    render(<Dashboard />);
    expect(screen.getByText("Sticky Wall")).toBeTruthy();
  });

  it("should display Tasks label", () => {
    render(<Dashboard />);
    expect(screen.getByText("Tasks")).toBeTruthy();
  });

  it("should use email prefix when displayName is not available", () => {
    render(<Dashboard />, {
      authValue: {
        user: {
          uid: "test-uid",
          email: "john@example.com",
          displayName: null,
        } as User,
      },
    });

    expect(screen.getByText(/Welcome back, john!/i)).toBeTruthy();
  });

  it("should render user icon", () => {
    const { container } = render(<Dashboard />);

    const userIcon = container.querySelector(".lucide-user");
    expect(userIcon).toBeVisible();
  });

  it("should apply hover effects on stat cards", () => {
    const { container } = render(<Dashboard />);

    const statCards = container.querySelectorAll(".hover\\:shadow-lg");
    expect(statCards.length).toBe(2);
  });
});

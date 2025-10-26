import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test/test-utils";
import { TaskHeader } from "./TaskHeader";

describe("TaskHeader Component", () => {
  const defaultProps = {
    onBack: vi.fn(),
  };

  it("should render title when provided", () => {
    render(<TaskHeader {...defaultProps} title="Test Task" />);

    expect(screen.getByText("Test Task")).toBeVisible();
  });

  it("should render subtitle when provided", () => {
    render(<TaskHeader {...defaultProps} subtitle="Task subtitle" />);

    expect(screen.getByText("Task subtitle")).toBeVisible();
  });

  it("should call onBack when back button is clicked", async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();

    render(<TaskHeader {...defaultProps} onBack={onBack} />);

    const backButton = screen.getAllByRole("button")[0];
    await user.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should display status badge when provided", () => {
    render(<TaskHeader {...defaultProps} status="done" />);

    expect(screen.getByText("done")).toBeVisible();
  });

  it("should render priority select in edit mode", () => {
    render(
      <TaskHeader
        {...defaultProps}
        isEditing
        priority="medium"
        onPriorityChange={vi.fn()}
      />
    );

    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThan(0);
  });

  it("should render status select in edit mode", () => {
    render(
      <TaskHeader
        {...defaultProps}
        isEditing
        status="open"
        onStatusChange={vi.fn()}
      />
    );

    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThan(0);
  });

  it("should call onPriorityChange when priority is changed", async () => {
    const onPriorityChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TaskHeader
        {...defaultProps}
        isEditing
        priority="medium"
        onPriorityChange={onPriorityChange}
      />
    );

    const selects = screen.getAllByRole("combobox");
    const prioritySelect = selects[0];
    await user.selectOptions(prioritySelect, "high");
    expect(onPriorityChange).toHaveBeenCalledWith("high");
  });

  it("should call onStatusChange when status is changed", async () => {
    const onStatusChange = vi.fn();
    const user = userEvent.setup();

    render(
      <TaskHeader
        {...defaultProps}
        isEditing
        status="open"
        onStatusChange={onStatusChange}
      />
    );

    const selects = screen.getAllByRole("combobox");
    const statusSelect = selects.length > 1 ? selects[1] : selects[0];
    await user.selectOptions(statusSelect, "done");

    expect(onStatusChange).toHaveBeenCalledWith("done");
  });

  it("should show edit button when onEdit is provided and not editing", () => {
    const { container } = render(
      <TaskHeader {...defaultProps} onEdit={vi.fn()} />
    );

    expect(container.querySelector(".lucide-pencil")!).toBeVisible();
  });

  it("should show delete button when onDelete is provided", () => {
    const { container } = render(
      <TaskHeader {...defaultProps} onDelete={vi.fn()} />
    );

    expect(container.querySelector(".lucide-trash-2")!).toBeVisible();
  });

  it("should call onEdit when edit button is clicked", async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <TaskHeader {...defaultProps} onEdit={onEdit} />
    );

    await user.click(container.querySelector(".lucide-pencil")!);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <TaskHeader {...defaultProps} onDelete={onDelete} />
    );

    await user.click(container.querySelector(".lucide-trash-2")!);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("should apply correct styling for done status", () => {
    render(<TaskHeader {...defaultProps} status="done" />);

    const badge = screen.getByText("done");
    expect(badge.className).toContain("bg-green-100");
    expect(badge.className).toContain("text-green-700");
  });
});

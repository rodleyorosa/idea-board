import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test/test-utils";
import { NoteHeader } from "./NoteHeader";

describe("NoteHeader Component", () => {
  const defaultProps = {
    title: "Test Note",
    isEditing: false,
    onBack: vi.fn(),
  };

  it("should render title in read mode", () => {
    render(<NoteHeader {...defaultProps} />);

    expect(screen.getByText("Test Note")).toBeVisible();
  });

  it("should render input in edit mode", () => {
    render(<NoteHeader {...defaultProps} isEditing />);

    const input = screen.getByDisplayValue("Test Note");
    expect(input).toBeVisible();
    expect(input.tagName).toBe("INPUT");
  });

  it("should call onBack when back button is clicked", async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();

    render(<NoteHeader {...defaultProps} onBack={onBack} />);

    const backButton = screen.getAllByRole("button")[0];
    await user.click(backButton);

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should call onEdit when edit button is clicked", async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <NoteHeader {...defaultProps} onEdit={onEdit} />
    );
    await user.click(container.querySelector(".lucide-pencil")!);

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("should call onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();

    render(<NoteHeader {...defaultProps} onDelete={onDelete} />);

    const buttons = screen.getAllByRole("button");
    const deleteButton = buttons[buttons.length - 1];
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("should show delete confirmation state", () => {
    render(
      <NoteHeader {...defaultProps} onDelete={vi.fn()} showDeleteConfirm />
    );

    const buttons = screen.getAllByRole("button");
    const deleteButton = buttons[buttons.length - 1];
    expect(deleteButton).toHaveClass("bg-red-600");
  });

  it("should call onTitleChange when input changes", async () => {
    const onTitleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <NoteHeader {...defaultProps} isEditing onTitleChange={onTitleChange} />
    );

    const input = screen.getByDisplayValue("Test Note");
    await user.clear(input);
    await user.type(input, "New Title");

    expect(onTitleChange).toHaveBeenCalled();
  });

  it("should not render edit button when not provided", () => {
    render(<NoteHeader {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(1); // Only back button
  });

  it("should not render delete button when not provided", () => {
    render(<NoteHeader {...defaultProps} onEdit={vi.fn()} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2); // Back and edit buttons only
  });

  it("should display placeholder when title is empty in edit mode", () => {
    render(
      <NoteHeader
        {...defaultProps}
        title=""
        isEditing
        onTitleChange={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText("Title...");
    expect(input).toBeVisible();
  });

  it("should display 'No title' when title is empty in read mode", () => {
    render(<NoteHeader {...defaultProps} title="" />);

    expect(screen.getByText("No title")).toBeVisible();
  });

  it("should limit title input to 50 characters", () => {
    render(<NoteHeader {...defaultProps} isEditing onTitleChange={vi.fn()} />);

    const input = screen.getByDisplayValue("Test Note");
    expect(input).toHaveAttribute("maxLength", "50");
  });
});

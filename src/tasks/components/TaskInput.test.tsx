import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test/test-utils";
import { TaskInput } from "./TaskInput";
import { TaskTextarea } from "./TaskTextarea";
import { PrioritySelector } from "./PrioritySelector";

describe("TaskInput Component", () => {
  it("should render input with value", () => {
    render(<TaskInput value="Test Task" onChange={vi.fn()} />);

    const input = screen.getByDisplayValue("Test Task");
    expect(input).toBeTruthy();
  });

  it("should call onChange when value changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<TaskInput value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "New Task");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should display placeholder", () => {
    render(<TaskInput value="" onChange={vi.fn()} placeholder="Task name" />);

    expect(screen.getByPlaceholderText("Task name")).toBeTruthy();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<TaskInput value="" onChange={vi.fn()} disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});

describe("TaskTextarea Component", () => {
  it("should render textarea with value", () => {
    render(<TaskTextarea value="Task description" onChange={vi.fn()} />);

    expect(screen.getByDisplayValue("Task description")).toBeTruthy();
  });

  it("should call onChange when value changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<TaskTextarea value="" onChange={handleChange} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "New description");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should render with correct number of rows", () => {
    render(<TaskTextarea value="" onChange={vi.fn()} rows={10} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "10");
  });

  it("should render with default rows when not specified", () => {
    render(<TaskTextarea value="" onChange={vi.fn()} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "6");
  });
});

describe("PrioritySelector Component", () => {
  it("should render all priority options", () => {
    render(<PrioritySelector value="medium" onChange={vi.fn()} />);

    expect(screen.getByText("Low")).toBeTruthy();
    expect(screen.getByText("Medium")).toBeTruthy();
    expect(screen.getByText("High")).toBeTruthy();
  });

  it("should highlight selected priority", () => {
    render(<PrioritySelector value="high" onChange={vi.fn()} />);

    const highButton = screen.getByRole("button", { name: /High/i });
    expect(highButton).toHaveClass("bg-red-50");
  });

  it("should call onChange when priority is selected", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<PrioritySelector value="medium" onChange={handleChange} />);

    const lowButton = screen.getByRole("button", { name: /Low/i });
    await user.click(lowButton);

    expect(handleChange).toHaveBeenCalledWith("low");
  });

  it("should display priority icons", () => {
    render(<PrioritySelector value="medium" onChange={vi.fn()} />);

    expect(screen.getByText("↓")).toBeTruthy(); // Low
    expect(screen.getByText("→")).toBeTruthy(); // Medium
    expect(screen.getByText("↑")).toBeTruthy(); // High
  });

  it("should render label with icon", () => {
    render(<PrioritySelector value="medium" onChange={vi.fn()} />);

    expect(screen.getByText("Priority")).toBeTruthy();
  });
});

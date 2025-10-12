import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test/test-utils";
import type { NoteColor } from "../../types";
import { ColorPicker } from "./ColorPicker";

describe("ColorPicker Component", () => {
  const colors: NoteColor[] = [
    "yellow",
    "rose",
    "sky",
    "emerald",
    "violet",
    "amber",
  ];

  it("should render all color options", () => {
    render(<ColorPicker selectedColor="yellow" onColorChange={vi.fn()} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(6);
  });

  it("should highlight selected color", () => {
    render(<ColorPicker selectedColor="rose" onColorChange={vi.fn()} />);

    const roseButton = screen.getByTitle("rose");
    expect(roseButton).toHaveClass("border-slate-800");
    expect(roseButton).toHaveClass("scale-110");
  });

  it("should call onColorChange when a color is clicked", async () => {
    const handleColorChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ColorPicker selectedColor="yellow" onColorChange={handleColorChange} />
    );

    const skyButton = screen.getByTitle("sky");
    await user.click(skyButton);

    expect(handleColorChange).toHaveBeenCalledWith("sky");
  });

  it("should render label", () => {
    render(<ColorPicker selectedColor="yellow" onColorChange={vi.fn()} />);

    expect(screen.getByText("Color:")).toBeTruthy();
  });

  it("should apply correct background colors", () => {
    render(<ColorPicker selectedColor="yellow" onColorChange={vi.fn()} />);

    const yellowButton = screen.getByTitle("yellow");
    expect(yellowButton).toHaveClass("bg-yellow-100");

    const roseButton = screen.getByTitle("rose");
    expect(roseButton).toHaveClass("bg-rose-100");
  });

  it("should have hover effect on non-selected colors", () => {
    render(<ColorPicker selectedColor="yellow" onColorChange={vi.fn()} />);

    const roseButton = screen.getByTitle("rose");
    expect(roseButton).toHaveClass("hover:scale-110");
    expect(roseButton).toHaveClass("border-slate-300");
  });

  it("should render all expected color names", () => {
    render(<ColorPicker selectedColor="yellow" onColorChange={vi.fn()} />);

    colors.forEach((color) => {
      expect(screen.getByTitle(color)).toBeTruthy();
    });
  });
});

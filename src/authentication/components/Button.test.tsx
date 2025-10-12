import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";
import { render, screen } from "../../test/test-utils";

describe("Button Component", () => {
  it("should render children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("should show loading spinner when loading prop is true", () => {
    const { container } = render(<Button loading>Submit</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(container.querySelector(".lucide-loader-circle")).toBeVisible();
  });

  it("should not show loading spinner when loading is false", () => {
    render(<Button loading={false}>Submit</Button>);

    expect(screen.getByText("Submit")).toBeTruthy();
    expect(screen.queryByTestId("loader")).toBeNull();
  });

  it("should be disabled when loading", () => {
    render(<Button loading={true}>Submit</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled={true}>Submit</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should call onClick when clicked and not disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should apply correct CSS classes", () => {
    render(<Button>Submit</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-indigo-600");
    expect(button).toHaveClass("text-white");
  });

  it("should pass through additional props", () => {
    render(
      <Button type="submit" data-testid="custom-button">
        Submit
      </Button>
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("type", "submit");
  });
});

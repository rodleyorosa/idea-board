import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../../test/test-utils";
import { Input } from "./Input";

describe("Input Component", () => {
  it("should render label correctly", () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText("Email")).toBeTruthy();
  });

  it("should render input with correct type", () => {
    render(<Input label="Password" id="password" type="password" />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("should display helper text when provided", () => {
    render(<Input label="Email" id="email" helperText="Enter a valid email" />);
    expect(screen.getByText("Enter a valid email")).toBeTruthy();
  });

  it("should apply error styles when error prop is true", () => {
    render(<Input label="Email" id="email" error={true} />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveClass("border-red-500");
  });

  it("should apply normal styles when error prop is false", () => {
    render(<Input label="Email" id="email" error={false} />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveClass("border-gray-300");
  });

  it("should show error style on helper text when error is true", () => {
    render(
      <Input label="Email" id="email" error={true} helperText="Invalid email" />
    );

    const helperText = screen.getByText("Invalid email");
    expect(helperText).toHaveClass("text-red-500");
  });

  it("should call onChange when input value changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input label="Email" id="email" onChange={handleChange} />);

    const input = screen.getByLabelText("Email");
    await user.type(input, "test@example.com");

    expect(handleChange).toHaveBeenCalled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Input label="Email" id="email" disabled />);

    const input = screen.getByLabelText("Email");
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:bg-gray-100");
  });

  it("should display placeholder correctly", () => {
    render(<Input label="Email" id="email" placeholder="you@example.com" />);

    const input = screen.getByPlaceholderText("you@example.com");
    expect(input).toBeTruthy();
  });

  it("should apply required attribute when provided", () => {
    render(<Input label="Email" id="email" required />);

    const input = screen.getByLabelText("Email");
    expect(input).toBeRequired();
  });

  it("should handle maxLength attribute", () => {
    render(<Input label="Name" id="name" maxLength={20} />);

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("maxLength", "20");
  });
});

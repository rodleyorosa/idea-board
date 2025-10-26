import userEvent from "@testing-library/user-event";
import { FirebaseError } from "firebase/app";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "../test/test-utils";
import Signup from "./Signup";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Signup Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render signup form with all fields", () => {
    render(<Signup />);

    expect(screen.getByLabelText(/name/i)).toBeVisible();
    expect(screen.getByLabelText(/^email$/i)).toBeVisible();
    expect(screen.getByLabelText(/^password$/i)).toBeVisible();
    expect(screen.getByLabelText(/confirm password/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /create/i })).toBeVisible();
  });

  it("should display link to login page", () => {
    render(<Signup />);

    const loginLink = screen.getByRole("link", { name: /sign in/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("should display character counter for name field", () => {
    render(<Signup />);

    expect(screen.getByText("0/20")).toBeVisible();
    expect(screen.getByText("Max 20 characters")).toBeVisible();
  });

  it("should update character counter as user types name", async () => {
    const user = userEvent.setup();
    render(<Signup />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, "John");

    expect(screen.getByText("4/20")).toBeVisible();
  });

  it("should show error when passwords do not match", async () => {
    const user = userEvent.setup();
    render(<Signup />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password456");
    await user.click(submitButton);

    expect(screen.getByText(/passwords do not match/i)).toBeVisible();
  });

  it("should show error when password is too short", async () => {
    const user = userEvent.setup();
    render(<Signup />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "12345");
    await user.type(confirmPasswordInput, "12345");
    await user.click(submitButton);

    expect(
      screen.getByText(/password must be at least 6 characters/i)
    ).toBeVisible();
  });

  it("should call signup function on valid form submit", async () => {
    const mockSignup = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<Signup />, {
      authValue: { signup: mockSignup },
    });

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith(
        "john@example.com",
        "password123",
        "John Doe"
      );
    });
  });

  it("should navigate to dashboard on successful signup", async () => {
    const mockSignup = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<Signup />, {
      authValue: { signup: mockSignup },
    });

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should display Firebase error message on signup failure", async () => {
    const mockSignup = vi
      .fn()
      .mockRejectedValue(
        new FirebaseError(
          "auth/email-already-in-use",
          "Email is already registered"
        )
      );
    const user = userEvent.setup();

    render(<Signup />, {
      authValue: { signup: mockSignup },
    });

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is already registered/i)).toBeVisible();
    });
  });

  it("should disable form inputs during submission", async () => {
    const mockSignup = vi
      .fn()
      .mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100))
      );
    const user = userEvent.setup();

    render(<Signup />, {
      authValue: { signup: mockSignup },
    });

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    expect(nameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(confirmPasswordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("should trim name before submission", async () => {
    const mockSignup = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(<Signup />, {
      authValue: { signup: mockSignup },
    });

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(nameInput, "  John Doe  ");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith(
        "john@example.com",
        "password123",
        "John Doe"
      );
    });
  });
});

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthForm } from "../hooks/useAuthForm";
import { AuthLayout } from "./components/AuthLayout";
import { Button } from "./components/Button";
import { ErrorAlert } from "./components/ErrorAlert";
import { Input } from "./components/Input";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup } = useAuth();
  const { error, loading, handleSubmit, setError } = useAuthForm({
    onSubmit: () => signup(email, password, name.trim()),
  });

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (!name.trim()) {
      setError("Please enter your name");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }
    await handleSubmit(e, { email, password, name: name.trim() });
  };

  return (
    <AuthLayout title="Create a new account">
      {error && <ErrorAlert message={error} />}
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <Input
              id="name"
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              required
              disabled={loading}
              placeholder="Your name"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">Max 20 characters</p>
              <p
                className={`text-xs ${
                  name.length >= 20
                    ? "text-red-500 font-medium"
                    : "text-gray-400"
                }`}
              >
                {name.length}/20
              </p>
            </div>
          </div>

          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            placeholder="you@example.com"
          />

          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
            placeholder="••••••••"
            helperText="Minimum 6 characters"
          />

          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" loading={loading}>
          Create
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500 transition"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

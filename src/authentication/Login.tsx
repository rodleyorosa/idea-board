import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthForm } from "../hooks/useAuthForm";
import { AuthLayout } from "./components/AuthLayout";
import { Button } from "./components/Button";
import { ErrorAlert } from "./components/ErrorAlert";
import { Input } from "./components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { error, loading, handleSubmit } = useAuthForm({
    onSubmit: () => login(email, password),
  });

  // TODO: add Google authentication
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Welcome back! Enter your credentials"
    >
      {error && <ErrorAlert message={error} />}
      <form
        onSubmit={(e) => handleSubmit(e, { email, password })}
        className="mt-8 space-y-6"
      >
        <div className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            autoComplete="email"
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
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" loading={loading}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500 transition"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

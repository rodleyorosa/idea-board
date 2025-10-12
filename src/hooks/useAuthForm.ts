import { FirebaseError } from "firebase/app";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthErrorMessage } from "../utils";

interface UseAuthFormProps<T> {
  onSubmit: (data: T) => Promise<void>;
  redirectPath?: string;
}

export function useAuthForm<T>({
  onSubmit,
  redirectPath = "/dashboard",
}: UseAuthFormProps<T>) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, data: T) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await onSubmit(data);
      navigate(redirectPath);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getAuthErrorMessage(err.code));
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleSubmit, setError };
}

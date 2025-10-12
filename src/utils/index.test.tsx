import { describe, expect, it } from "vitest";
import {
 getAuthErrorMessage,
  getPriorityConfig,
  getStatusColor,
  getStatusIconColor,
  getStatusTextColor,
} from ".";
import type { TaskPriority } from "../types";

describe("Utils Functions", () => {
  describe("getStatusColor", () => {
    it("should return correct color for done status", () => {
      expect(getStatusColor("done")).toBe(
        "bg-green-100 text-green-700 border-green-200"
      );
    });

    it("should return correct color for in progress status", () => {
      expect(getStatusColor("in progress")).toBe(
        "bg-orange-100 text-orange-700 border-orange-200"
      );
    });

    it("should return correct color for open status", () => {
      expect(getStatusColor("open")).toBe(
        "bg-gray-100 text-gray-700 border-gray-200"
      );
    });

    it("should return default color for unknown status", () => {
      expect(getStatusColor("unknown")).toBe(
        "bg-blue-100 text-blue-700 border-blue-200"
      );
    });

    it("should handle case insensitive status", () => {
      expect(getStatusColor("DONE")).toBe(
        "bg-green-100 text-green-700 border-green-200"
      );
    });

    it("should handle status with extra whitespace", () => {
      expect(getStatusColor("  open  ")).toBe(
        "bg-gray-100 text-gray-700 border-gray-200"
      );
    });
  });

  describe("getStatusIconColor", () => {
    it("should return active color when status matches", () => {
      const result = getStatusIconColor("done", "done");
      expect(result).toBe("bg-green-500 text-white");
    });

    it("should return inactive color when status does not match", () => {
      const result = getStatusIconColor("done", "open");
      expect(result).toBe("bg-green-100 text-green-600");
    });

    it("should handle in-progress status", () => {
      const result = getStatusIconColor("in-progress", "in-progress");
      expect(result).toBe("bg-amber-500 text-white");
    });
  });

  describe("getStatusTextColor", () => {
    it("should return active text color when status matches", () => {
      const result = getStatusTextColor("open", "open");
      expect(result).toBe("text-blue-700");
    });

    it("should return inactive text color when status does not match", () => {
      const result = getStatusTextColor("open", "done");
      expect(result).toBe("text-gray-600");
    });
  });

  describe("getPriorityConfig", () => {
    it("should return correct config for low priority", () => {
      const config = getPriorityConfig("low" as TaskPriority);
      expect(config).toEqual({
        color: "text-green-600 bg-white border-green-300",
        icon: "↓",
        label: "Low",
      });
    });

    it("should return correct config for high priority", () => {
      const config = getPriorityConfig("high" as TaskPriority);
      expect(config).toEqual({
        color: "text-red-600 bg-white border-red-300",
        icon: "↑",
        label: "High",
      });
    });

    it("should return medium priority as default", () => {
      const config = getPriorityConfig("medium" as TaskPriority);
      expect(config).toEqual({
        color: "text-yellow-600 bg-white border-yellow-300",
        icon: "→",
        label: "Medium",
      });
    });

    it("should handle invalid priority with default", () => {
      const config = getPriorityConfig("invalid" as TaskPriority);
      expect(config.label).toBe("Medium");
    });
  });

  describe("getAuthErrorMessage", () => {
    it("should return correct message for user-not-found", () => {
      expect(getAuthErrorMessage("auth/user-not-found")).toBe("User not found");
    });

    it("should return correct message for wrong-password", () => {
      expect(getAuthErrorMessage("auth/wrong-password")).toBe(
        "Incorrect password"
      );
    });

    it("should return correct message for invalid-email", () => {
      expect(getAuthErrorMessage("auth/invalid-email")).toBe(
        "Invalid email address"
      );
    });

    it("should return correct message for email-already-in-use", () => {
      expect(getAuthErrorMessage("auth/email-already-in-use")).toBe(
        "Email is already registered"
      );
    });

    it("should return default message for unknown error code", () => {
      expect(getAuthErrorMessage("auth/unknown-error")).toBe(
        "An error occurred during authentication"
      );
    });
  });
});

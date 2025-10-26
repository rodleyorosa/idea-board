import { act, renderHook } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import { describe, expect, it } from "vitest";
import type { TaskItemType } from "../types";
import { useTaskForm } from "./useTaskForm";

describe("useTaskForm", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useTaskForm());

    expect(result.current.title).toBe("");
    expect(result.current.description).toBe("");
    expect(result.current.priority).toBe("medium");
    expect(result.current.status).toBe("open");
    expect(result.current.isSaveDisabled).toBe(true);
  });

  it("should update title", () => {
    const { result } = renderHook(() => useTaskForm());

    act(() => {
      result.current.setTitle("Test Task");
    });

    expect(result.current.title).toBe("Test Task");
  });

  it("should update description", () => {
    const { result } = renderHook(() => useTaskForm());

    act(() => {
      result.current.setDescription("Test Description");
    });

    expect(result.current.description).toBe("Test Description");
  });

  it("should update priority", () => {
    const { result } = renderHook(() => useTaskForm());

    act(() => {
      result.current.setPriority("high");
    });

    expect(result.current.priority).toBe("high");
  });

  it("should update status", () => {
    const { result } = renderHook(() => useTaskForm());

    act(() => {
      result.current.setStatus("in-progress");
    });

    expect(result.current.status).toBe("in-progress");
  });

  it("should enable save when title has content", () => {
    const { result } = renderHook(() => useTaskForm());

    act(() => {
      result.current.setTitle("Test Task");
    });

    expect(result.current.isSaveDisabled).toBe(false);
  });

  it("should keep save disabled when title is only whitespace", () => {
    const { result } = renderHook(() => useTaskForm());

    act(() => {
      result.current.setTitle("   ");
    });

    expect(result.current.isSaveDisabled).toBe(true);
  });

  it("should enable save when title has content even without description", () => {
    const { result } = renderHook(() => useTaskForm());

    act(() => {
      result.current.setTitle("Test Task");
    });

    expect(result.current.isSaveDisabled).toBe(false);
  });

  it("should update from task object", () => {
    const { result } = renderHook(() => useTaskForm());

    const mockTask: TaskItemType = {
      id: "1",
      title: "Existing Task",
      description: "Existing Description",
      status: "in-progress",
      priority: "high",
      createdAt: Timestamp.now(),
      updatedAt: null,
    };

    act(() => {
      result.current.updateFromTask(mockTask);
    });

    expect(result.current.title).toBe("Existing Task");
    expect(result.current.description).toBe("Existing Description");
    expect(result.current.status).toBe("in-progress");
    expect(result.current.priority).toBe("high");
    expect(result.current.isSaveDisabled).toBe(false);
  });

  it("should maintain isSaveDisabled state after updating from task", () => {
    const { result } = renderHook(() => useTaskForm());

    const mockTask: TaskItemType = {
      id: "1",
      title: "",
      description: "Some description",
      status: "open",
      priority: "low",
      createdAt: Timestamp.now(),
      updatedAt: null,
    };

    act(() => {
      result.current.updateFromTask(mockTask);
    });

    expect(result.current.isSaveDisabled).toBe(true);
  });

  it("should handle task with all fields populated", () => {
    const { result } = renderHook(() => useTaskForm());

    const mockTask: TaskItemType = {
      id: "1",
      title: "Complete Task",
      description: "Detailed description",
      status: "done",
      priority: "low",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    act(() => {
      result.current.updateFromTask(mockTask);
    });

    expect(result.current.title).toBe("Complete Task");
    expect(result.current.description).toBe("Detailed description");
    expect(result.current.status).toBe("done");
    expect(result.current.priority).toBe("low");
  });
});

import { act, renderHook } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import { describe, expect, it } from "vitest";
import type { TaskItemType } from "../types";
import { useTaskFilters } from "./useTaskFilters";

const mockTasks: TaskItemType[] = [
  {
    id: "1",
    title: "Task 1",
    description: "High priority open task",
    status: "open",
    priority: "high",
    createdAt: Timestamp.fromDate(new Date("2024-01-01")),
    updatedAt: null,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Medium priority in-progress task",
    status: "in-progress",
    priority: "medium",
    createdAt: Timestamp.fromDate(new Date("2024-01-02")),
    updatedAt: null,
  },
  {
    id: "3",
    title: "Task 3",
    description: "Low priority done task",
    status: "done",
    priority: "low",
    createdAt: Timestamp.fromDate(new Date("2024-01-03")),
    updatedAt: null,
  },
  {
    id: "4",
    title: "Task 4",
    description: "High priority done task",
    status: "done",
    priority: "high",
    createdAt: Timestamp.fromDate(new Date("2024-01-04")),
    updatedAt: null,
  },
];

describe("useTaskFilters", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    expect(result.current.sortBy).toBe("date-desc");
    expect(result.current.filterPriority).toBe("all");
    expect(result.current.filterStatus).toBe("all");
    expect(result.current.filteredAndSortedTasks).toHaveLength(4);
  });

  it("should filter tasks by priority", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setFilterPriority("high");
    });

    expect(result.current.filteredAndSortedTasks).toHaveLength(2);
    expect(
      result.current.filteredAndSortedTasks.every(
        (task) => task.priority === "high"
      )
    ).toBe(true);
  });

  it("should filter tasks by status", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setFilterStatus("done");
    });

    expect(result.current.filteredAndSortedTasks).toHaveLength(2);
    expect(
      result.current.filteredAndSortedTasks.every(
        (task) => task.status === "done"
      )
    ).toBe(true);
  });

  it("should filter by both priority and status", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setFilterPriority("high");
      result.current.setFilterStatus("done");
    });

    expect(result.current.filteredAndSortedTasks).toHaveLength(2);
    expect(result.current.filteredAndSortedTasks[0].id).toBe("4");
  });

  it("should sort by date descending (default)", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    const sortedIds = result.current.filteredAndSortedTasks.map((t) => t.id);
    expect(sortedIds).toEqual(["4", "3", "2", "1"]);
  });

  it("should sort by date ascending", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSortBy("date-asc");
    });

    const sortedIds = result.current.filteredAndSortedTasks.map((t) => t.id);
    expect(sortedIds).toEqual(["1", "2", "3", "4"]);
  });

  it("should sort by priority", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSortBy("priority");
    });

    const priorities = result.current.filteredAndSortedTasks.map(
      (t) => t.priority
    );
    expect(priorities[0]).toBe("high");
    expect(priorities[priorities.length - 1]).toBe("low");
  });

  it("should sort by status", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSortBy("status");
    });

    const statuses = result.current.filteredAndSortedTasks.map((t) => t.status);
    expect(statuses[0]).toBe("open");
    expect(statuses[statuses.length - 1]).toBe("done");
  });

  it("should reset all filters", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setFilterPriority("high");
      result.current.setFilterStatus("done");
      result.current.setSortBy("priority");
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.sortBy).toBe("date-desc");
    expect(result.current.filterPriority).toBe("all");
    expect(result.current.filterStatus).toBe("all");
    expect(result.current.filteredAndSortedTasks).toHaveLength(4);
  });

  it("should handle empty tasks array", () => {
    const { result } = renderHook(() => useTaskFilters([]));

    expect(result.current.filteredAndSortedTasks).toHaveLength(0);
  });

  it("should update filtered tasks when input tasks change", () => {
    const { result, rerender } = renderHook(
      ({ tasks }) => useTaskFilters(tasks),
      { initialProps: { tasks: mockTasks } }
    );

    expect(result.current.filteredAndSortedTasks).toHaveLength(4);

    rerender({ tasks: [mockTasks[0]] });

    expect(result.current.filteredAndSortedTasks).toHaveLength(1);
  });
});

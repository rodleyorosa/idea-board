import { act, renderHook } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import { describe, expect, it } from "vitest";
import type { NoteItem } from "../types";
import { useNoteForm } from "./useNoteForm";

describe("useNoteForm", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useNoteForm());

    expect(result.current.title).toBe("");
    expect(result.current.content).toBe("");
    expect(result.current.color).toBe("bg-yellow-100");
    expect(result.current.isSaveDisabled).toBe(true);
  });

  it("should update title", () => {
    const { result } = renderHook(() => useNoteForm());

    act(() => {
      result.current.setTitle("Test Title");
    });

    expect(result.current.title).toBe("Test Title");
  });

  it("should update content", () => {
    const { result } = renderHook(() => useNoteForm());

    act(() => {
      result.current.setContent("Test Content");
    });

    expect(result.current.content).toBe("Test Content");
  });

  it("should update color", () => {
    const { result } = renderHook(() => useNoteForm());

    act(() => {
      result.current.setColor("rose");
    });

    expect(result.current.color).toBe("rose");
  });

  it("should enable save when title has content", () => {
    const { result } = renderHook(() => useNoteForm());

    act(() => {
      result.current.setTitle("Test Title");
    });

    expect(result.current.isSaveDisabled).toBe(false);
  });

  it("should enable save when content has text", () => {
    const { result } = renderHook(() => useNoteForm());

    act(() => {
      result.current.setContent("Test Content");
    });

    expect(result.current.isSaveDisabled).toBe(false);
  });

  it("should enable save when both title and content have text", () => {
    const { result } = renderHook(() => useNoteForm());

    act(() => {
      result.current.setTitle("Test Title");
      result.current.setContent("Test Content");
    });

    expect(result.current.isSaveDisabled).toBe(false);
  });

  it("should disable save when title is only whitespace", () => {
    const { result } = renderHook(() => useNoteForm());

    act(() => {
      result.current.setTitle("   ");
    });

    expect(result.current.isSaveDisabled).toBe(true);
  });

  it("should disable save when content is only whitespace", () => {
    const { result } = renderHook(() => useNoteForm());

    act(() => {
      result.current.setContent("   ");
    });

    expect(result.current.isSaveDisabled).toBe(true);
  });

  it("should update from note object", () => {
    const { result } = renderHook(() => useNoteForm());

    const mockNote: NoteItem = {
      id: "1",
      title: "Existing Title",
      content: "Existing Content",
      color: "emerald",
      createdAt: Timestamp.now(),
      updatedAt: null,
    };

    act(() => {
      result.current.updateFromNote(mockNote);
    });

    expect(result.current.title).toBe("Existing Title");
    expect(result.current.content).toBe("Existing Content");
    expect(result.current.color).toBe("emerald");
    expect(result.current.isSaveDisabled).toBe(false);
  });

  it("should maintain isSaveDisabled state after updating from note", () => {
    const { result } = renderHook(() => useNoteForm());

    const mockNote: NoteItem = {
      id: "1",
      title: "",
      content: "",
      color: "sky",
      createdAt: Timestamp.now(),
      updatedAt: null,
    };

    act(() => {
      result.current.updateFromNote(mockNote);
    });

    expect(result.current.isSaveDisabled).toBe(true);
  });
});

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../configuration";
import type { NoteItem } from "../types";

export const useNote = (userId: string | null) => {
  const [notes, setNotes] = useState<NoteItem[]>([]);

  useEffect(() => {
    if (!userId) {
      setNotes([]);
      return;
    }

    try {
      const notesCollection = collection(db, "users", userId, "notes");

      const notesQuery = query(notesCollection, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        notesQuery,
        (snapshot) => {
          const notesData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              content: data.content,
              color: data.color,
              createdAt: data.createdAt,
            };
          });

          setNotes(notesData);
        },
        (err) => {
          console.error("Error loading notes:", err);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Firebase configuration error:", err);
    }
  }, [userId]);

  const addNote = async (title: string, content: string, color: string) => {
    if (!userId) {
      throw new Error("User must be logged in to add notes");
    }

    try {
      const notesCollection = collection(db, "users", userId, "notes");
      await addDoc(notesCollection, {
        title,
        content,
        color,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error adding note:", err);
      throw new Error("Failed to add note: " + (err as Error).message);
    }
  };

  const editNote = async (
    id: string,
    title: string,
    content: string,
    color: string
  ) => {
    if (!userId) {
      throw new Error("User must be logged in to update notes");
    }

    try {
      const noteRef = doc(db, "users", userId, "notes", id);
      await updateDoc(noteRef, {
        title,
        content,
        color,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating note:", err);
      throw new Error("Failed to update note: " + (err as Error).message);
    }
  };

  const deleteNote = async (id: string) => {
    if (!userId) {
      throw new Error("User must be logged in to delete notes");
    }

    try {
      const noteRef = doc(db, "users", userId, "notes", id);
      await deleteDoc(noteRef);
    } catch (err) {
      console.error("Error deleting note:", err);
      throw new Error("Failed to delete note: " + (err as Error).message);
    }
  };

  return { notes, addNote, editNote, deleteNote };
};

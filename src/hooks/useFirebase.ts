import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../configuration";
import type { NoteItem } from "../types";

export const useFirebase = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);

  useEffect(() => {
    try {
      const notesCollection = collection(db, "notes");

      const unsubscribe = onSnapshot(
        notesCollection,
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
          throw new Error("Error loading notes: " + err.message);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      throw new Error(
        "Firebase configuration error: " + (err as Error).message
      );
    }
  }, []);

  const addNote = async (title: string, content: string, color: string) => {
    try {
      const notesCollection = collection(db, "notes");
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

  const deleteNote = async (id: string) => {
    try {
      const noteRef = doc(db, "notes", id);
      await deleteDoc(noteRef);
    } catch (err) {
      console.error("Error deleting note:", err);
      throw new Error("Failed to delete note: " + (err as Error).message);
    }
  };

  return { notes, addNote, deleteNote };
};

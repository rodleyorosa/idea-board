import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../configuration";
import type { NoteItem } from "../types";
import { useAuth } from "./useAuth";

export const useFirebase = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setNotes([]);
      return;
    }

    try {
      const notesCollection = collection(db, "notes");

      const q = query(notesCollection, where("userId", "==", currentUser.uid));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const notesData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              content: data.content,
              color: data.color,
              createdAt: data.createdAt,
              userId: data.userId,
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
  }, [currentUser]); // AGGIUNGI currentUser come dipendenza

  const addNote = async (title: string, content: string, color: string) => {
    if (!currentUser) {
      throw new Error("You must be authenticated to create a note");
    }

    try {
      const notesCollection = collection(db, "notes");
      await addDoc(notesCollection, {
        title,
        content,
        color,
        userId: currentUser.uid,
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

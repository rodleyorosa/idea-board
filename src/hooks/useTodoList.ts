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
import { useEffect, useMemo, useState } from "react";
import { db } from "../configuration";
import type { TaskItem, TaskPriority, TaskStatus } from "../types";
import { useAuth } from "./useAuth";

export const useTodoList = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const { user } = useAuth();

  const userId = useMemo(() => {
    return user?.uid;
  }, [user?.uid]);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      return;
    }

    try {
      const tasksCollection = collection(db, "users", userId, "tasks");

      const tasksQuery = query(tasksCollection, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        tasksQuery,
        (snapshot) => {
          const tasksData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              description: data.description,
              status: data.status,
              priority: data.priority,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            };
          });

          setTasks(tasksData);
        },
        (err) => {
          console.error("Error loading tasks:", err);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Firebase configuration error:", err);
    }
  }, [userId]);

  const addTask = async (
    title: string,
    description: string,
    priority: TaskPriority
  ) => {
    if (!userId) {
      throw new Error("User must be logged in to add notes");
    }

    try {
      const tasksCollection = collection(db, "users", userId, "tasks");
      await addDoc(tasksCollection, {
        title,
        description,
        status: "open",
        priority,
        createdAt: serverTimestamp(),
        updatedAt: null,
      });
    } catch (err) {
      console.error("Error adding note:", err);
      throw new Error("Failed to add note: " + (err as Error).message);
    }
  };

  const editTask = async (
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    priority: TaskPriority
  ) => {
    if (!userId) {
      throw new Error("User must be logged in to update notes");
    }

    try {
      const noteRef = doc(db, "users", userId, "tasks", id);
      await updateDoc(noteRef, {
        title,
        description,
        status,
        priority,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error updating task:", err);
      throw new Error("Failed to update task: " + (err as Error).message);
    }
  };

  const deleteTask = async (id: string) => {
    if (!userId) {
      throw new Error("User must be logged in to delete tasks");
    }

    try {
      const taskRef = doc(db, "users", userId, "tasks", id);
      await deleteDoc(taskRef);
    } catch (err) {
      console.error("Error deleting task:", err);
      throw new Error("Failed to delete task: " + (err as Error).message);
    }
  };

  return { tasks, addTask, editTask, deleteTask };
};

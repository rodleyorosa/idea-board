import { useCallback, useState } from "react";
import { colors } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useFirebase } from "../hooks/useFirebase";
import { MainContentWrapper } from "../MainContentWrapper";
import type { NoteItem } from "../types";
import { NewNote } from "./NewNote";
import { Note } from "./Note";

export const StickyWall = () => {
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const { user } = useAuth();
  const { notes } = useFirebase(user?.uid || null);

  const openNote = useCallback((item: NoteItem) => {
    setSelectedNote(item);
    // block the scroll when the modal is opened
    document.body.style.overflow = "hidden";
  }, []);

  const closeNote = useCallback(() => {
    setSelectedNote(null);
    // unblock the scroll when the modal is closed
    document.body.style.overflow = "unset";
  }, []);

  return (
    <MainContentWrapper title="Sticky Wall">
      <div className="flex">
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <NewNote />
            {notes.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => openNote(item)}
                  className={`${
                    colors[item.color]
                  } p-4 rounded-md shadow-md cursor-pointer min-h-[10rem] sm:aspect-square`}
                >
                  <h3 className="text-lg font-semibold mb-2 truncate">
                    {item.title}
                  </h3>
                  <div className="text-sm text-gray-700 line-clamp-7 whitespace-pre-wrap">
                    {item.content}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      {selectedNote && <Note item={selectedNote} closeNote={closeNote} />}
    </MainContentWrapper>
  );
};

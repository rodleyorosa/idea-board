import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../constants";
import { useNote } from "../hooks/useNote";
import { MainContentWrapper } from "../MainContentWrapper";
import type { NoteItem } from "../types";

export const StickyWall = () => {
  const { notes } = useNote();
  const navigate = useNavigate();

  const openNote = useCallback(
    (item: NoteItem) => {
      navigate(`/note/${item.id}`);
    },
    [navigate]
  );

  const createNote = useCallback(() => {
    navigate("/note/create");
  }, [navigate]);

  return (
    <MainContentWrapper title="Sticky Wall">
      <div className="flex">
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <div
              onClick={createNote}
              className="
                bg-white border-2 border-dashed border-gray-300 
                hover:border-gray-400 hover:bg-gray-50
                rounded-md shadow-md sm:aspect-square
                flex items-center justify-center
                cursor-pointer transition-colors duration-200 pt-2 pb-6
              "
            >
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">+</div>
                <p className="text-gray-500 font-medium">Create a new note</p>
              </div>
            </div>

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
    </MainContentWrapper>
  );
};

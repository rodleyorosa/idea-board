import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../assets/ArrowBack";
import { colors } from "../constants";
import { useAuth } from "../hooks/useAuth";
import { useNote } from "../hooks/useNote";
import { MainContentWrapper } from "../MainContentWrapper";
import type { NoteColor } from "../types";

export const NoteCreation = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<NoteColor>("yellow");
  const { user } = useAuth();
  const { addNote } = useNote(user?.uid || null);
  const navigate = useNavigate();

  const isCreateButtonDisabled = useMemo(() => {
    return !title.trim() && !content.trim();
  }, [title, content]);

  const handleBack = useCallback(() => {
    navigate("/sticky-wall");
  }, [navigate]);

  const saveNote = useCallback(async () => {
    if (!title.trim() && !content.trim()) return;

    try {
      await addNote(title, content, color);
      navigate("/sticky-wall");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }, [addNote, color, content, navigate, title]);

  return (
    <MainContentWrapper
      title="Nuova Nota"
      className="lg:w-2/3"
      fullscreenMobile
    >
      <div
        className={`${colors[color]} sm:rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[calc(100vh-8rem)] sm:min-h-[600px]`}
      >
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gray-200/50 flex-shrink-0 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <ArrowBack
              onClick={handleBack}
              className="hover:bg-white/30 text-gray-700 flex-shrink-0"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              title={title}
              className="flex-1 px-3 py-2 bg-white/70 border-2 border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 text-lg font-bold min-w-0"
              placeholder="Titolo..."
            />
          </div>
        </div>

        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-white/70 border-2 border-gray-300 rounded-xl resize-none outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-700 text-base leading-relaxed min-h-[300px]"
            placeholder="Contenuto..."
          />
        </div>

        <div className="p-6 bg-white/30 backdrop-blur-sm border-t border-gray-200/50 flex-shrink-0">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Colore:</span>
              <div className="flex gap-2">
                {(Object.entries(colors) as [NoteColor, string][]).map(
                  ([colorName, colorClass]) => (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => setColor(colorName)}
                      className={`w-8 h-8 rounded-full ${colorClass} border-2 transition-transform hover:scale-110 cursor-pointer ${
                        color === colorName
                          ? "border-slate-800 scale-110"
                          : "border-slate-300"
                      }`}
                      title={colorName}
                    />
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleBack}
                className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer text-sm"
              >
                Annulla
              </button>
              <button
                onClick={saveNote}
                disabled={isCreateButtonDisabled}
                title={
                  isCreateButtonDisabled
                    ? "Aggiungi titolo o contenuto"
                    : "Crea nota"
                }
                className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-sm"
              >
                Salva Nota
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};

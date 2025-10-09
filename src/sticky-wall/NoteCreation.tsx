import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../assets/ArrowBack";
import { ColorIcon } from "../assets/icons/sticky-wall/ColorIcon";
import { ContentIcon } from "../assets/icons/sticky-wall/ContentIcon";
import { TitleIcon } from "../assets/icons/sticky-wall/TitleIcon";
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
        className={`${colors[color]} sm:rounded-2xl shadow-xl overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowBack
                onClick={handleBack}
                className="hover:bg-white/30 text-gray-700"
              />
              <div>
                <span className="text-gray-800 font-bold text-xl">
                  Nuova Nota
                </span>
                <p className="text-gray-600 text-sm mt-0.5">
                  Crea una nuova nota per le tue idee
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <div className="w-5 h-5 bg-white/70 rounded-lg flex items-center justify-center">
                  <TitleIcon />
                </div>
                Titolo
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/70 border-2 border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder:text-gray-400"
                placeholder="Inserisci il titolo..."
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <div className="w-5 h-5 bg-white/70 rounded-lg flex items-center justify-center">
                  <ContentIcon />
                </div>
                Contenuto
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-white/70 border-2 border-gray-300 rounded-xl resize-none outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder:text-gray-400"
                rows={8}
                placeholder="Scrivi il contenuto della nota..."
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <div className="w-5 h-5 bg-white/70 rounded-lg flex items-center justify-center">
                  <ColorIcon />
                </div>
                Colore
              </label>
              <div className="flex gap-3">
                {(Object.entries(colors) as [NoteColor, string][]).map(
                  ([colorName, colorClass]) => (
                    <button
                      key={colorName}
                      type="button"
                      onClick={() => setColor(colorName)}
                      className={`w-10 h-10 rounded-full ${colorClass} border-2 transition-transform hover:scale-110 cursor-pointer ${
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
          </div>
        </div>

        <div className="p-6 bg-white/30 backdrop-blur-sm border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
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
              className="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
            >
              Salva Nota
            </button>
          </div>
        </div>
      </div>
    </MainContentWrapper>
  );
};

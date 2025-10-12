import { colors } from "../../constants";
import type { NoteColor } from "../../types";

interface NoteContainerProps {
  color: NoteColor;
  children: React.ReactNode;
}

export function NoteContainer({ color, children }: NoteContainerProps) {
  return (
    <div
      className={`${colors[color]} sm:rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[calc(100vh-8rem)] sm:min-h-[600px]`}
    >
      {children}
    </div>
  );
}

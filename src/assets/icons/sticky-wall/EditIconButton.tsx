interface EditiconButtonProps {
  onClick: () => void;
}

export const EditIconButton = ({ onClick }: EditiconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 bg-white/50 hover:bg-white/70 rounded-lg transition-colors cursor-pointer"
    >
      <svg
        className="w-4 h-4 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </button>
  );
};

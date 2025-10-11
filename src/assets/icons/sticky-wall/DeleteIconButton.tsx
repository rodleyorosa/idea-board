interface DeleteIconButtonProps {
  onClick: () => void;
  showDeleteConfirm: boolean;
}

export const DeleteIconButton = ({
  onClick,
  showDeleteConfirm,
}: DeleteIconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer ${
        showDeleteConfirm
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-white/50 hover:bg-white/70 text-gray-700"
      }`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
};

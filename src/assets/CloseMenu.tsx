interface CloseMenuProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const CloseMenu = ({ onClick }: CloseMenuProps) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer p-1 hover:bg-gray-100 rounded lg:hidden"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

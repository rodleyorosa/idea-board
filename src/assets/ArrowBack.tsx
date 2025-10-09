interface ArrowBackProps {
  onClick: () => void;
  className?: string;
}

export const ArrowBack = ({ onClick, className = "" }: ArrowBackProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer flex-shrink-0 ${className}`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export const Checkbox = () => {
  return (
    <div className="relative w-5 h-5 border-2 group rounded-full transition-all duration-200 flex-shrink-0 border-gray-300 group-hover:border-gray-500 group-hover:bg-white cursor-pointer mt-0.5">
      <svg
        className="w-3 h-3 text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

import { useCallback, useState } from "react";
import { CreationNote } from "./CreationNote";

export const NewNote = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <CreationNote isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div
        onClick={openModal}
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
          <p className="text-gray-500 font-medium">Aggiungi nuova nota</p>
        </div>
      </div>
    </>
  );
};

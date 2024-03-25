import { useState } from "react";
import CreateAFamilyModal from "./CreateAFamilyModal";

const CreateAFamily = ({ addItemToStore }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Create a Family
      </button>

      <CreateAFamilyModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        addItemToStore={(item) => {
          addItemToStore(item);
          closeModal();
        }}
      />
    </>
  );
};

export default CreateAFamily;

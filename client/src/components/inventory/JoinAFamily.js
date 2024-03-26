import { useState } from "react";
import JoinAFamilyModal from "./JoinAFamilyModal";

const JoinAFamily = ({ addItemToStore }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => setIsModalOpen(true)}
      >
        Join a Family
      </button>

      <JoinAFamilyModal
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

export default JoinAFamily;

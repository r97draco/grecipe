import { useState } from "react";
import AddEditItemModal from "./AddEditItemModal";

const AddItem = ({ addItemToStore }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="p-0 rounded dark:text-white"
        onClick={() => setIsModalOpen(true)}
      >
        + Item
      </button>

      <AddEditItemModal
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

export default AddItem;

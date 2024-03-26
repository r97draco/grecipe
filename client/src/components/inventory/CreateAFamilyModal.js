import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "fixed",
    width: "350px",
    height: "300px",
    top: "calc(50% - 150px)",
    left: "calc(50% - 175px)",
    overflow: "auto",
    borderRadius: "1rem",
    backgroundColor: "white",
    padding: "2rem",
    borderColor: "#10B981", // Greenish color
    borderWidth: "2px",
  },
};

const CreateAFamilyModal = ({ isOpen, closeModal }) => {
  const [familyName, setFamilyName] = useState("");

  const handleCreateFamily = () => {
    // Handle creating the new family here
    console.log("Created family:", familyName);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Create a New Family
      </h1>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="familyName" className="mb-1 text-gray-700">
            Family Name
          </label>
          <input
            id="familyName"
            type="text"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreateFamily}
          className="px-4 py-2 font-bold text-white transition-colors duration-200 transform bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default CreateAFamilyModal;

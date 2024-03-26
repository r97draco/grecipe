import { useState } from "react";
import Modal from "react-modal";
import CreatableSelect from "react-select/creatable";

// Custom styles for react-select component
const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    borderColor: "#3B82F6", // Blueish color
    boxShadow: "none",
    "&:hover": {
      borderColor: "#3B82F6", // Blueish color
    },
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused
        ? "#DBEAFE" // Light blue
        : isSelected
        ? "#3B82F6" // Blueish color
        : undefined,
      color: isFocused ? "#1E3A8A" : isSelected ? "white" : "#1E3A8A", // Dark blue
      cursor: "pointer",
    };
  },
};

const customStyles = {
  content: {
    position: "fixed",
    width: "350px",
    height: "600px",
    top: "calc(50% - 300px)",
    left: "calc(50% - 175px)",
    overflow: "auto",
    borderRadius: "1rem",
    backgroundColor: "white",
    padding: "2rem",
    borderColor: "#3B82F6", // Blueish color
    borderWidth: "2px",
  },
};

const JoinAFamilyModal = ({ isOpen, closeModal }) => {
  const [selectedFamily, setSelectedFamily] = useState(null);

  // Sample family options, replace with actual data
  const familyOptions = [
    { value: "family1", label: "Smith Family" },
    { value: "family2", label: "Wilson Family" },
    // Add more families as needed
  ];

  const handleJoinFamily = () => {
    // Handle joining the selected family here
    console.log("Joined family:", selectedFamily);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Pick a Family to Join
      </h1>

      <div className="flex flex-col space-y-4">
        <CreatableSelect
          isClearable
          options={familyOptions}
          value={selectedFamily}
          onChange={(option) => setSelectedFamily(option)}
          styles={selectStyles}
        />

        <button
          onClick={handleJoinFamily}
          className="px-4 py-2 font-bold text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Join
        </button>
      </div>
    </Modal>
  );
};

export default JoinAFamilyModal;

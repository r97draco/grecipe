import { useState } from "react";
import Modal from "react-modal";
import CreatableSelect from "react-select/creatable";
import { getFoodOptions } from "../../utils/inventory";

// Custom styles for react-select component
const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    borderColor: "#fe9e0d",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#fe9e0d",
    },
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused
        ? "#ffedd5"
        : isSelected
        ? "#fe9e0d"
        : undefined,
      color: isFocused ? "#1a202c" : isSelected ? "white" : "#1a202c",
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
    borderColor: "#fe9e0d",
    borderWidth: "2px",
  },
};

const AddEditItemModal = ({
  prevItem,
  isEdit,
  addItemToStore,
  isOpen,
  closeModal,
}) => {
  const [name, setName] = useState(prevItem?.name || "");
  const [quantity, setQuantity] = useState(prevItem?.quantity || 1);
  const [expiresAt, setExpiresAt] = useState(prevItem?.expiresAt || "");

  // const addItem = async () => {
  //   const response = await customFetch("/api/inventory/add", {
  //     method: "POST",
  //     body: JSON.stringify([
  //       {
  //         name,
  //         quantity,
  //         expiresAt,
  //       },
  //     ]),
  //   });

  //   if (response.status === "success") {
  //     closeModal();
  //   }
  // };

  //   const updateItem = async () => {
  //     const response = await customFetch("/api/inventory/update", {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         name,
  //         quantity,
  //         expiresAt,
  //       }),
  //     });

  //     if (response.status === "success") {
  //       closeModal();
  //     }
  //   };

  const submitForm = (e) => {
    e.preventDefault();
    addItemToStore({
      name,
      quantity,
      expiresAt,
    });
    setName("");
    setQuantity(1);
    setExpiresAt(""); // Reset expiry date
    closeModal();

    // if (isEdit) {
    //   updateItem();
    // } else {
    //   addItem();
    // }
  };

  const foodOptions = getFoodOptions();

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        {isEdit ? "Edit" : "Add"} item
      </h1>

      <form className="flex flex-col space-y-4" onSubmit={submitForm}>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-gray-700">
            Name
          </label>
          <CreatableSelect
            isClearable
            options={foodOptions}
            value={foodOptions.find((option) => option.value === name)}
            onChange={(option) => setName(option?.value || "")}
            styles={selectStyles}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="quantity" className="mb-1 text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            required
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="expiresAt" className="mb-1 text-gray-700">
            Expiry Date
          </label>
          <input
            id="expiresAt"
            type="date"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 font-bold text-white transition-colors duration-200 transform bg-orange-500 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          {isEdit ? "Update item" : "Add item"}
        </button>
      </form>
    </Modal>
  );
};

export default AddEditItemModal;

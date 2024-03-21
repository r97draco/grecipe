import { useState } from "react";
import Modal from "react-modal";
import CreatableSelect from "react-select/creatable";
import { getFoodOptions } from "../../utils/inventory";

const customStyles = {
  content: {
    position: "fixed",
    width: "350px",
    height: "500px",
    top: "calc(50% - 250px)",
    left: "calc(50% - 175px)",
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
    let twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    twoWeeksFromNow = twoWeeksFromNow.toISOString();

    e.preventDefault();
    addItemToStore({ name, quantity, expiresAt: twoWeeksFromNow });
    setName("");
    setQuantity(1);

    // if (isEdit) {
    //   updateItem();
    // } else {
    //   addItem();
    // }
  };

  const foodOptions = getFoodOptions();

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h1 className="mb-4 text-2xl font-bold">
        {isEdit ? "Edit" : "Add"} item
      </h1>

      <form
        className="flex flex-col justify-between align-start"
        onSubmit={submitForm}
        contentLabel="Add item modal"
        style={{ height: "400px" }}
      >
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1">
              Name
            </label>
            <CreatableSelect
              isClearable
              options={foodOptions}
              value={foodOptions.find((option) => option.value === name)}
              onChange={(option) => setName(option.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="quantity" className="mb-1">
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
        </div>

        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update item" : "Add item"}
        </button>
      </form>
    </Modal>
  );
};

export default AddEditItemModal;

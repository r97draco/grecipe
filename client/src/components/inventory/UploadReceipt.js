import { useState } from "react";
import customFetch from "../../utils/fetchWrapper";
import { notify } from "../Nav";

const UploadReceipt = ({ updateInventory }) => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = (event) => {
    const formData = new FormData();

    if (event.target?.files?.length) {
      formData.append("receipt", event.target?.files?.[0]);

      uploadReceipt(formData);
    }
  };

  const uploadReceipt = async (formData) => {
    setIsLoading(true);

    const response = await customFetch("/item/upload", {
      method: "POST",
      body: formData,
    });

    setIsLoading(false);
    notify(response.message, response.success ? "error" : "success");

    updateInventory(response.items);
  };

  return (
    <div className="flex flex-col space-y-1 font-mono text-left">
      <label
        htmlFor="receipt-upload"
        className="block text-sm font-medium text-gray-700"
      >
        Upload receipt
      </label>
      <input
        id="receipt-upload"
        className="cursor-pointer file:mr-4 file:py-2 file:px-10 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-black file:transition-colors file:duration-200 hover:file:bg-orange-400 focus:file:outline-none focus:file:ring-2 focus:file:ring-offset-2 focus:file:ring-orange-500 disabled:bg-gray-300"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={uploadFile}
        disabled={isLoading}
      />
    </div>
  );
};

export default UploadReceipt;

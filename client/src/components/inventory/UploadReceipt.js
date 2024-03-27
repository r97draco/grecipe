import { useState } from "react";
import customFetch from "../../utils/fetchWrapper";
import { notify } from "../Nav";
import { Button } from "@mui/material";

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
        for="inputField"
        className="px-10 py-5 mr-4 text-sm font-semibold text-black transition-colors duration-200 bg-orange-500 border-0 rounded-full cursor-pointer hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-300"
      >
        Upload Receipt
      </label>
      <input
        type="file"
        id="inputField"
        className="hidden"
        accept=".jpg, .jpeg, .png"
        onChange={uploadFile}
        disabled={isLoading}
      />

      <input
        id="receipt-upload"
        className="hidden cursor-pointer file:mr-4 file:py-5 file:px-10 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-black file:transition-colors file:duration-200 hover:file:bg-orange-400 focus:file:outline-none focus:file:ring-2 focus:file:ring-offset-2 focus:file:ring-orange-500 disabled:bg-gray-300"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={uploadFile}
        disabled={isLoading}
      />
    </div>
  );
};

export default UploadReceipt;

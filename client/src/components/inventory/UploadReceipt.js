import { useState } from "react";
import customFetch from "../../utils/fetchWrapper";

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

    const response = await customFetch("/inventory/upload", {
      method: "POST",
      body: formData,
    });

    setIsLoading(false);

    updateInventory(response.items);
  };

  return (
    <div className="flex flex-col space-y-1 font-mono text-left">
      <label htmlFor="receipt-upload">Upload receipt</label>
      <input
        id="receipt-upload"
        className="block w-full text-sm cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-sesmibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 disabled:cursor-not-allowed"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={uploadFile}
        disabled={isLoading}
      />
    </div>
  );
};

export default UploadReceipt;

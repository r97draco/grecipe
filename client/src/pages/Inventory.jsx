import { useEffect, useState } from "react";
import UploadReceipt from "../components/inventory/UploadReceipt";
import AddItem from "../components/inventory/AddItem";
import customFetch from "../utils/fetchWrapper";
import { backendUrl } from "../App";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useContext } from "react";
import { UserContext } from "../App";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setIsTableLoading(true);

    const items = await customFetch("/inventory", {
      method: "GET",
    });

    if (Array.isArray(items)) {
      setInventoryData(items);
    }

    setIsTableLoading(false);
  };

  const saveItemsToServer = async () => {
    setIsLoading(true);

    const token = localStorage.getItem("self_care_token");
    const localInventory = inventoryData?.filter((item) => item.isLocal);

    const response = await axios.post(
      `${backendUrl}/api/inventory/add`,
      {
        items: localInventory,
      },
      {
        headers: {
          Authorization: token,
          email: user.email,
        },
      }
    );
    setIsLoading(false);

    if (response?.status === 201) {
      const newData = inventoryData.map((item) => ({
        ...item,
        ...(item.isLocal
          ? {
              _id: response?.data?.find((newItem) => item.name === newItem.name)
                ?._id,
            }
          : {}),
        isLocal: false,
      }));

      setInventoryData(newData);
    }
  };

  const updateLocalInventory = (items) => {
    try {
      const newData = [
        ...inventoryData,
        ...items?.map(({ name, quantity, expiresAt }) => ({
          name,
          quantity,
          expiresAt,
          isLocal: true,
        })),
      ];

      setInventoryData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pt-10 pb-12 md:pt-10 md:pb-20">
          <div className="pb-12 text-center md:pb-16">
            <h1 className="mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-400">
                Inventory
              </span>
            </h1>

            <div style={{ width: "500px", margin: "0 auto" }}>
              <div
                className="flex items-center justify-between mb-2"
                style={{ width: "100%" }}
              >
                <UploadReceipt updateInventory={updateLocalInventory} />
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                  style={{ height: "fit-content" }}
                  onClick={saveItemsToServer}
                  disabled={inventoryData.length === 0 || isLoading}
                >
                  Save
                </button>
              </div>
              <InventoryTable
                inventoryData={inventoryData}
                setInventoryData={setInventoryData}
              />
              {isTableLoading ? (
                <div className="mt-4">
                  <Spinner />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inventory;

const InventoryTable = ({ inventoryData, setInventoryData }) => {
  const addItem = (newItem) => {
    const itemExists = inventoryData?.find(
      (item) => item.name === newItem.name
    );

    if (!itemExists) {
      const newData = [...inventoryData, { ...newItem, isLocal: true }];
      setInventoryData(newData);
    }
  };

  const deleteItem = async (index) => {
    const item = inventoryData[index];

    if (!item.isLocal) {
      await customFetch(`/inventory/delete/${item._id}`, {
        method: "DELETE",
      });
    }

    const newData = inventoryData?.filter((item, i) => i !== index);
    setInventoryData(newData);
  };

  return (
    <div className="w-full max-w-lg rounded-lg shadow-md bg-gray-50 dark:bg-gray-700">
      <div className="flex flex-row justify-between px-2 py-4 mx-2">
        <p className="flex items-center flex-grow-0 font-bold text-black text-md dark:text-white ">
          Items
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-300 dark:text-white">
            {inventoryData ? inventoryData.length : "0"}
          </span>
        </p>

        <AddItem addItemToStore={addItem} />
      </div>
      <ul>
        {inventoryData &&
          inventoryData?.length > 0 &&
          inventoryData?.map((item, index) => (
            <li
              className="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800"
              key={item.name}
            >
              <div className="flex items-center justify-start text-sm">
                <span className="mx-4">{index + 1}</span>
                <span>{item.name}</span>
              </div>
              <div className="flex items-center">
                {/* <span className="mx-4">{item.qty}</span> */}
                <button
                  className="flex items-center justify-center w-5 h-5 mx-4 text-gray-500 rounded-full hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => deleteItem(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

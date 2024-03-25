import { useEffect, useState } from "react";
import UploadReceipt from "../components/inventory/UploadReceipt";
import AddItem from "../components/inventory/AddItem";
import customFetch from "../utils/fetchWrapper";
import { backendUrl } from "../App";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useContext } from "react";
import { UserContext } from "../App";
import "./Inventory.css";
import JoinAFamily from "../components/inventory/JoinAFamily";
import CreateAFamily from "../components/inventory/CreateAFamily";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { user, setUser } = useContext(UserContext);

  // TODO: need to implement these checks whether the user is part of the family and head of the family
  const isPartOfFamily = true;
  const isHeadOfFamily = true;

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

  const filteredInventoryData = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const sortedInventoryData = filteredInventoryData.sort((a, b) => {
    if (sortBy === "name") {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    } else if (sortBy === "expiresAt") {
      const dateA = new Date(a.expiresAt);
      const dateB = new Date(b.expiresAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return 0;
    }
  });

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      // Toggle order if sorting by the same criteria
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sorting criteria and default to ascending order
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  if (!isPartOfFamily) {
    return (
      <section className="relative grid grid-cols-2 ">
        <div className="col-span-2 max-w-6xl px-4 mx-auto bg-white bg-opacity-50 rounded-lg sm:px-6 backdrop-blur-md">
          <div className="pt-10 pb-12 md:pt-10 md:pb-20">
            <div className="pb-12 text-center md:pb-16">
              <h1 className="mb-10 text-2xl font-bold tracking-tighter md:text-2xl leading-tighter">
                <span>Please join a Family first or create one!</span>
              </h1>
              <JoinAFamily />
              <CreateAFamily />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative grid grid-cols-2 ">
      <div className="col-span-1 max-w-7xl px-4 mx-auto bg-white bg-opacity-50 rounded-lg sm:px-6 backdrop-blur-md">
        <div className="pt-10 pb-12 md:pt-10 md:pb-20">
          <div className="pb-12 text-center md:pb-16">
            <h1 className="mb-10 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-blue-400">
                Inventory
              </span>
            </h1>

            <div style={{ width: "500px", margin: "0 auto" }}>
              <div
                className="flex items-center justify-between mb-10"
                style={{ width: "100%" }}
              >
                <UploadReceipt updateInventory={updateLocalInventory} />
                <button
                  className="secondary-button"
                  style={{ height: "fit-content" }}
                  onClick={saveItemsToServer}
                  disabled={inventoryData.length === 0 || isLoading}
                >
                  Save
                </button>
              </div>
              <input
                type="text"
                placeholder="Filter by item name"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="px-3 py-1 mb-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
              <div className="flex justify-center mb-10 space-x-4">
                <button
                  onClick={() => handleSort("name")}
                  className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-400"
                >
                  Sort by Name
                </button>
                <button
                  onClick={() => handleSort("expiresAt")}
                  className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:ring focus:
                  ring-orange-400"
                >
                  Sort by Expiry Date
                </button>
              </div>
              <InventoryTable
                inventoryData={sortedInventoryData}
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

      <div className="col-span-1 max-w-sm px-4 mx-auto bg-white bg-opacity-50 rounded-lg sm:px-6 backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-center">
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-blue-400 text-lg">
            Family List
          </span>
        </h2>
        <ul className="mt-4">
          {/* Example family members */}
          <li className="flex items-center justify-between py-2 border-b border-gray-300">
            <span className="text-gray-700">John Smith</span>
            <span className="text-gray-500">Head of Family</span>
          </li>
          <li className="flex items-center justify-between py-2 border-b border-gray-300">
            <span className="text-gray-700">Nancy Smith</span>
            <span className="text-gray-500">Family Member</span>
          </li>
        </ul>
        {/* Add or remove family member button */}
        <div className="mt-4 flex justify-center space-x-4">
          {/* Conditionally render based on user role */}
          {isHeadOfFamily && (
            <>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Add Family Member
              </button>
              <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                Remove Family Member
              </button>
            </>
          )}
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
                <span className="mx-4 text-sm font-medium">{index + 1}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <div className="flex items-center">
                <span className="mx-4 text-sm font-medium">
                  Expiry Date: {item.expiresAt}
                </span>
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

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
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FiDelete } from "react-icons/fi";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetchInventory();
  }, [user]);

  const fetchInventory = async () => {
    setIsTableLoading(true);
    const token = localStorage.getItem("self_care_token");
    const res = await axios.get(`${backendUrl}/api/item/family`, {
      params: { familyId: user.family },
      headers: {
        Authorization: token,
      },
    });
    const items = res.data;
    console.log("items", items);
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
      `${backendUrl}/api/item/add`,
      {
        items: localInventory,
      },
      {
        params: { email: user.email },
        headers: {
          Authorization: token,
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

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log("Page Refreshed");
    try {
      const token = localStorage.getItem("self_care_token");
      const email = user.email;

      axios
        .get(`${backendUrl}/api/user/getuser`, {
          params: { email: email },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
          }
        });
    } catch (signInError) {
      console.error("Error during sign-in", signInError);
    }
  }, [refresh]);

  return (
    <section className="relative ">
      <div className="max-w-6xl px-4 mx-auto bg-white bg-opacity-50 rounded-lg sm:px-6 backdrop-blur-md ">
        <div className="pt-10 pb-12 md:pt-10 md:pb-20">
          <div className="pb-12 text-center md:pb-16">
            {!user.family ? (
              <Family setRefresh={setRefresh} />
            ) : (
              <>
                <h1 className="mb-10 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-blue-400">
                    Inventory
                  </span>
                </h1>
                <div style={{ width: "500px", margin: "0 auto" }}>
                  Welcome, {user.userName} . Family: {user.family}
                  {user.isFamilyHead && <p>You are the head of the family</p>}
                  <FamilyInfo
                    setRefresh={setRefresh}
                    familyId={user.family}
                    head={user.isFamilyHead}
                  />
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
                      className="px-4 py-2 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-400"
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FamilyInfo = ({ setRefresh, familyId, head }) => {
  const [familyData, setFamilyData] = useState(null);
  const userContext = useContext(UserContext);
  useEffect(() => {
    const getFamilyData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/family/${familyId}`,
          {
            headers: {
              Authorization: localStorage.getItem("self_care_token"),
            },
          }
        );
        setFamilyData(response.data);
      } catch (error) {
        console.error("Error getting family data:", error.response.data);
      }
    };
    getFamilyData();
  }, [familyId]);

  //url structure /api/family/updatefamily/:familyId

  const deleteMember = async (memberId) => {
    console.log("memberId", memberId);
    try {
      await axios.put(
        `${backendUrl}/api/family/updatefamily/${familyId}`,
        {
          action: "remove",
          memberId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("self_care_token"),
          },
        }
      );
      const updatedFamily = await axios.get(
        `${backendUrl}/api/family/${familyId}`,
        {
          headers: {
            Authorization: localStorage.getItem("self_care_token"),
          },
        }
      );
      setFamilyData(updatedFamily.data);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error deleting member:", error.response.data);
    }
  };

  if (head) {
    return (
      <div className="mb-10">
        {familyData ? (
          <>
            <h2 className="text-xl font-bold">Family Info</h2>
            <p>Family Name: {familyData.name}</p>
            <p>Members:</p>
            <ul>
              {familyData.members.map((member) => (
                <li key={member._id}>
                  {member.userName}{" "}
                  <IconButton
                    variant="contained"
                    color="error"
                    onClick={() => deleteMember(member._id)}
                  >
                    <FiDelete />
                  </IconButton>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Loading family data...</p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-10">
      {familyData ? (
        <>
          <h2 className="text-xl font-bold">Family Info</h2>
          <p>Family Name: {familyData.name}</p>
          <p>Members:</p>
          <ul>
            {familyData.members.map((member) => (
              <li key={member._id}>
                {member.userName}
                {member._id === userContext.user._id && (
                  <IconButton
                    variant="contained"
                    color="error"
                    onClick={() => deleteMember(member._id)}
                  >
                    <FiDelete />
                  </IconButton>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading family data...</p>
      )}
    </div>
  );
};

const Family = ({ setRefresh }) => {
  const [familyName, setFamilyName] = useState("");
  const [familyIdToJoin, setFamilyIdToJoin] = useState("");
  const [userId, setUserId] = useState(""); // Assuming you have a way to get the current user's ID

  const userContext = useContext(UserContext);
  useEffect(() => {
    console.log("user", userContext.user);
    setUserId(userContext.user._id);
  }, [userContext.user]);

  const handleCreateFamily = async () => {
    try {
      // await axios.post("/createfamily", {
      await axios.post(
        `${backendUrl}/api/family/createfamily`,
        {
          name: familyName,
          members: [userContext.user._id],
          isFamilyHead: true,
          userId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("self_care_token"),
          },
        }
      );
      setFamilyName("");
      console.log("Created Family");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error creating family:", error.response.data);
    }
  };

  const [families, setFamilies] = useState([]);
  const getAllFamilies = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/family/getallfamilies`,
        {
          headers: {
            Authorization: localStorage.getItem("self_care_token"),
          },
        }
      );
      console.log("Families:", response.data);
      setFamilies(response.data);
      // Optionally, set the list of families in state
    } catch (error) {
      console.error("Error getting families:", error.response.data);
      // Optionally, show an error message
    }
  };

  const handleJoinFamily = async (familyId) => {
    try {
      await axios.put(
        `${backendUrl}/api/family/updatefamily/${familyId}`,
        {
          action: "add",
          memberId: userId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("self_care_token"),
          },
        }
      );
      setRefresh((prev) => !prev);
      // Optionally, refresh the list of families or show a success message
    } catch (error) {
      console.error("Error joining family:", error.response.data);
      // Optionally, show an error message
    }
  };

  // create a list of families name with a button to join
  const familyList = families.map((family) => (
    <div key={family._id} className="flex items-center justify-between mb-4">
      <p>{family.name}</p>
      <Button variant="contained" onClick={() => handleJoinFamily(family._id)}>
        Join
      </Button>
    </div>
  ));

  useEffect(() => {
    getAllFamilies();
  }, []);

  return (
    <Stack spacing={3} sx={{ width: "100%", maxWidth: 500, margin: "auto" }}>
      <h1 className="mb-10 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-blue-400">
          Family
        </span>
      </h1>

      {/* Form for creating a new family */}
      <TextField
        label="Family Name"
        variant="outlined"
        value={familyName}
        onChange={(e) => setFamilyName(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleCreateFamily} fullWidth>
        Create Family
      </Button>

      {/* Form for joining an existing family by ID */}
      <Typography variant="h6" gutterBottom>
        Join a Family
      </Typography>
      {familyList}
    </Stack>
  );
};

export default Inventory;

const InventoryTable = ({ inventoryData, setInventoryData }) => {
  const user = useContext(UserContext);
  const addItem = async (newItem) => {
    const itemExists = inventoryData?.find(
      (item) => item.name === newItem.name
    );

    if (!itemExists) {
      const newData = [...inventoryData, { ...newItem, isLocal: true }];
      setInventoryData(newData);
      // try {
      //   const token = localStorage.getItem("self_care_token");
      //   await axios.post(
      //     `${backendUrl}/api/item/add`,
      //     {
      //       items: newData,
      //     },
      //     {
      //       params: { email: user.email },
      //       headers: {
      //         Authorization: token,
      //       },
      //     }
      //   );
      // } catch (error) {
      //   console.error("Error adding item:", error.response.data);
      // }
    }
  };

  const deleteItem = async (index) => {
    const item = inventoryData[index];

    if (!item.isLocal) {
      await customFetch(`/item/delete/${item._id}`, {
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
              key={item._id || index}
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

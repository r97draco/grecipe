import React, { createContext, useState } from "react";
import Routers from "./Routers";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext();
// export const backendUrl = "http://localhost:9191";
export const backendUrl = process.env.REACT_APP_API_URL;

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routers />
    </UserContext.Provider>
  );
}

export default App;

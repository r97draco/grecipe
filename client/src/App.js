import React, { createContext, useState } from "react";
import Routers from "./Routers";

export const UserContext = createContext();
export const backendUrl = "http://localhost:9191";

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routers />
    </UserContext.Provider>
  );
}

export default App;

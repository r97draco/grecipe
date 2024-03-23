import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Landing from "./pages/Landing";
import Inventory from "./pages/Inventory";
import Recipee from "./pages/Recipee";

const Routers = () => {
  return (
    <BrowserRouter>
      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        {/* <section className="relative"> */}
        <div className="px-4 mx-auto sm:px-6">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/recipe" element={<Recipee />} />
          </Routes>
        </div>
        {/* </section> */}
      </main>
    </BrowserRouter>
  );
};

export default Routers;

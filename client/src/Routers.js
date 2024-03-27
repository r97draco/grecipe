import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Landing from "./pages/Landing";
import Inventory from "./pages/Inventory";
import Recipee from "./pages/Recipee";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";

const Routers = () => {
  return (
    <BrowserRouter>
      {/*  Page content */}
      <main className="flex-grow">
        <Nav />
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
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Routers;

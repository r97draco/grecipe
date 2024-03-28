import React from "react";
import Home from "../components/Home";
import About from "../components/About";
import Work from "../components/Work";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import "../App.css";

const Landing = () => {
  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Landing;

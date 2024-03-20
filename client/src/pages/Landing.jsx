import React from "react";
import Home from "../components/Home";
import About from "../components/About";
import Work from "../components/Work";
import Testimonial from "../components/Testimonial";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../App.css";

const Landing = () => {
  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;

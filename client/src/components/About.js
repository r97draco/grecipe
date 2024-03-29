import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";

const About = () => {
  return (
    <div className="about-section-container about">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <h1 className="primary-heading">
          Simplifying Meal Preparation and Grocery Budgeting
        </h1>
        <p className="primary-text">
          Our application streamlines meal planning by allowing users to pool
          grocery purchases and recommends recipes based on available
          ingredients.
        </p>
        <p className="primary-text">
          Users can upload receipts to update their inventory, facilitating
          effective budgeting and reducing food waste.
        </p>
        <p className="primary-text">
          Developed from our own experiences as students, we aim to address
          common challenges in grocery budgeting and meal preparation.
        </p>
      </div>
    </div>
  );
};

export default About;

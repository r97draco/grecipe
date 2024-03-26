import React from "react";
import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          Our users love the convenience and efficiency our app provides. Here's
          what one of them had to say:
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
          "I absolutely love this app! It has made grocery shopping and meal
          planning so much easier for me and my family. The inventory management
          feature is incredibly handy, and the recipe suggestions are always a
          hit. Highly recommended!"
        </p>
        <div className="testimonials-stars-container flex">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John Smith</h2>
      </div>
    </div>
  );
};

export default Testimonial;

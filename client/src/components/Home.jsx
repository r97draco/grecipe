import React from "react";
import { ReactTyped } from "react-typed";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="bg-transparent primary-heading">
            We built a platform where you can{" "}
            <ReactTyped
              style={{ backgroundColor: "transparent" }}
              className="font-bold font-coolvetica text-primary-500 "
              strings={[
                "Scan your receipts",
                "Track your groceries",
                "Find new recipe",
              ]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </h1>

          <button className="secondary-button">
            Try it Now! <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;

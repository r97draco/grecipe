import React from "react";
import { ReactTyped } from "react-typed";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">We built a platform where you can
            <ReactTyped
              className="primary-heading"
              strings={[
                "Scan your receipts",
                "Track your groceries",
                "Find new recipes",
              ]}
              typeSpeed={40}
              backSpeed={50}
              attr="placeholder"

              loop
            >
              <input type="text" />
            </ReactTyped>
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

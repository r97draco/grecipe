import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Upload Grocery Receipt",
      text: "Family head uploads a grocery receipt, and the app extracts item details, updating the inventory.",
    },
    {
      image: ChooseMeals,
      title: "Manage Inventory",
      text: "View, add, delete, or modify items in the inventory. Track spending and set budget limits.",
    },
    {
      image: DeliveryMeals,
      title: "Manage Family Members",
      text: "Family head creates/manage member accounts, assigns permissions, and tracks grocery spending.",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Get familiar with the seamless process of managing groceries and meal
          planning using our application.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;

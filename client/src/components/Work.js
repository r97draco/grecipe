import React from "react";
import UploadReceipt from "../Assets/upload-receipt.jpg";
import ManageInventory from "../Assets/manage-inventory.jpg";
import ManageFamily from "../Assets/manage-family.jpg";

const Work = () => {
  const workInfoData = [
    {
      image: UploadReceipt,
      title: "Upload Grocery Receipt",
      text: "Family head uploads a grocery receipt, and the app extracts item details, updating the inventory.",
    },
    {
      image: ManageInventory,
      title: "Manage Inventory",
      text: "View, add, delete, or modify items in the inventory. Track spending and set budget limits.",
    },
    {
      image: ManageFamily,
      title: "Manage Family Members",
      text: "Family head creates/manage member accounts, assigns permissions, and tracks grocery spending.",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
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

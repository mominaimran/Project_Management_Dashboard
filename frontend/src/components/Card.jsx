import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="bg-white p-4 shadow rounded-md">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default Card;

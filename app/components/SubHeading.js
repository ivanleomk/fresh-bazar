import React from "react";

const SubHeading = ({ text }) => {
  return (
    <div
      style={{
        fontFamily: "Lato",
        fontSize: "20px",
        fontWeight: "400",
      }}
      className="leading-loose"
    >
      {text}
    </div>
  );
};

export default SubHeading;

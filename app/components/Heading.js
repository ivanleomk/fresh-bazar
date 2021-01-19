import React from "react";

const Heading = ({ text }) => {
  return (
    <div
      style={{ fontFamily: "Poppins", fontWeight: "600px", fontSize: "48px" }}
    >
      {text}
    </div>
  );
};

export default Heading;

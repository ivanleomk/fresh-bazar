import React from "react";

const Button = ({ text, emphasis }) => {
  if (!emphasis) {
    return (
      <div
        className="font-bold rounded-sm flex items-center justify-center py-2 px-6 text-black mx-4"
        style={{
          backgroundColor: "#F9F9F9",
          fontSize: "20px",
          fontFamily: "Lato",
        }}
      >
        <span>{text}</span>
      </div>
    );
  }
  return (
    <div
      className=" font-bold rounded-sm flex items-center rounded-md justify-center  py-2 px-6"
      style={{
        backgroundColor: "#02D2A9",
        color: "#FFFFFF",
        fontSize: "20px",
        fontFamily: "Lato",
      }}
    >
      <span>{text}</span>
    </div>
  );
};

export default Button;

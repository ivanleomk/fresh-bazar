import React from "react";
import SubHeading from "./SubHeading";

const CategoryLink = ({ selected, text, onClickHandler }) => {
  return (
    <button
      type="button"
      className={`flex items-start px-4 py-6 bg-white mt-10 rounded-lg focus:outline-none ${
        selected ? "bg-green-400" : null
      }`}
      onClick={onClickHandler}
    >
      <SubHeading text={text} />
    </button>
  );
};

export default CategoryLink;

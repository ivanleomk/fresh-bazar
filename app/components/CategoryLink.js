import React from "react";
import SubHeading from "./SubHeading";

const CategoryLink = ({ selected, text, onClickHandler }) => {
  const styling = selected
    ? "flex items-start px-4 py-4 bg-white mt-10 bg-green-400 rounded-lg focus:outline-none"
    : "flex items-start px-4 py-4 bg-white mt-10 focus:outline-none";

  return (
    <button type="button" className={styling} onClick={onClickHandler}>
      <SubHeading text={text} />
    </button>
  );
};

export default CategoryLink;

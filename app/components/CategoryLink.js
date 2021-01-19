import React from "react";
import SubHeading from "./SubHeading";
import clsx from "clsx";

const classes = {
  buttonActive:
    "flex items-start px-4 py-6 bg-white mt-10 rounded-lg focus:outline-none bg-green-400",
  button:
    "flex items-start px-4 py-6 bg-white mt-10 rounded-lg focus:outline-none",
};

const CategoryLink = ({ selected, text, onClickHandler }) => {
  return (
    <button
      type="button"
      className={clsx([classes.button, selected && classes.buttonActive])}
      onClick={onClickHandler}
    >
      <SubHeading text={text} />
    </button>
  );
};

export default CategoryLink;

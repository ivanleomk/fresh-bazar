import React from "react";
import SubHeading from "./SubHeading";
import clsx from "clsx";
import PropTypes from "prop-types";

const classes = {
  buttonActive:
    "flex items-start px-4 py-6 bg-white mt-10 rounded-lg focus:outline-none bg-green-400",
  button:
    "flex items-start px-4 py-6 bg-white mt-10 rounded-lg focus:outline-none",
};

const CategoryLink: React.FC<{
  selected: boolean;
  text: string;
  onClickHandler: any;
}> = ({ selected, text, onClickHandler }) => {
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

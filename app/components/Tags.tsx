import React from "react";
import PropTypes from "prop-types";

const Tags = ({ text }) => {
  return (
    <span className="flex-shrink-0 inline-block px-2 py-4 mr-4 mb-4 text-green-800 text-xs font-medium bg-green-100 rounded-full">
      {text}
    </span>
  );
};
Tags.PropTypes = {
  text: String,
};
export default Tags;

import React from "react";

const Tags = ({ text }) => {
  return (
    <span
      style={{
        fontFamily: "Poppins",
      }}
      className="flex-shrink-0 min-w-md inline-block px-2 py-4 mr-4 mb-4 text-green-800 text-xs font-medium bg-green-100 rounded-sm"
    >
      {text}
    </span>
  );
};

export default Tags;

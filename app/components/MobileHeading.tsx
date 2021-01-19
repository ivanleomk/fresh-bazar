import React from "react";
import { PropTypes } from "prop-types";

interface MobileHeadingProps {
  text: PropTypes.string;
}

export const MobileHeading: React.FC<MobileHeadingProps> = ({ text }) => {
  return (
    <div
      style={{ fontFamily: "Poppins", fontWeight: "600px", fontSize: "36px" }}
    >
      {text}
    </div>
  );
};

import React from "react";
import PropTypes from "prop-types";

interface MobileHeadingProps {
  text: string;
}

export const MobileHeading: React.FC<MobileHeadingProps> = ({ text }) => {
  return <div style={{ fontFamily: "Poppins", fontSize: "36px" }}>{text}</div>;
};

import React from "react";
import Image from "next/image";
import Heading from "./Heading";
import Button from "./Button";

const Header = () => {
  return (
    <div
      className="flex justify-between items-center sticky px-10 pt-10"
      style={{ backgroundColor: "#F9F9F9" }}
    >
      <Heading text="Fresh Bazar" />
      <div className="flex  space-x-2">
        <Button text="Our Story" emphasis={false} />
        <Button text="Log in" emphasis={true} />
      </div>
    </div>
  );
};

export default Header;

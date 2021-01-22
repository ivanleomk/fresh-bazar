import React from "react";
import { useRouter } from "next/router";
import { useScrollContext } from "../context/ScrollContext";

const RedirectLink = ({
  text,
  pathname,
  children,
  customStyling,
  onClose,
  setScroll,
}) => {
  const router = useRouter();
  const { setScrollY } = useScrollContext();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(pathname);
    onClose();
    setScrollY(0);
  };

  return (
    <button
      onClick={handleClick}
      className={
        customStyling
          ? customStyling
          : "bg-gray-100 text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
      }
    >
      {text}
      {children}
    </button>
  );
};

export default RedirectLink;

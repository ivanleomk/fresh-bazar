import React from "react";
import { useRouter } from "next/router";

const RedirectLink = ({ text, pathname, children, customStyling, onClose }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(pathname);
    if (onClose) {
      onClose();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={
        customStyling
          ? customStyling
          : "text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
      }
    >
      {text}
      {children}
    </button>
  );
};

export default RedirectLink;

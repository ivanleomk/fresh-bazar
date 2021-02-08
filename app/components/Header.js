import React, { useEffect, useRef } from "react";
import Heading from "./Heading";

import useWindowSize from "../hooks/useWindowDimensions";
import { TABLET_BREAKPOINT } from "../constants/breakpoints";
import { MobileHeading } from "./MobileHeading";
import { useDisclosure } from "@chakra-ui/react";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  const { width } = useWindowSize();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: menuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();

  return (
    <div
      className="flex justify-between items-center sticky px-6 py-10"
      style={{ backgroundColor: "#F9F9F9" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-10 w-10"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
      <MobileSidebar className="h-screen" onClose={onClose} isOpen={isOpen} />
      {/* {width > TABLET_BREAKPOINT && <Heading text="Fresh Bazar" />}
      {width <= TABLET_BREAKPOINT && <MobileHeading text="Fresh Bazar" />}
       */}
      <h2 class="text-3xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
        FreshBazar
      </h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-10 w-10"
        onClick={onOpen}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
  );
};

export default Header;

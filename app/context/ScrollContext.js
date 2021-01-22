import { createContext, useContext } from "react";
import { useScroll } from "../hooks/useScroll";

const ScrollContext = createContext();

export function ScrollWrapper({ children }) {
  const { scrollY, setScrollY } = useScroll();

  let sharedState = {
    scrollY,
    setScrollY,
  };

  return (
    <ScrollContext.Provider value={sharedState}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}

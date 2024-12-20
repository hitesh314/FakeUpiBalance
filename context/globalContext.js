"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import pageDetails from "../public/data/about-pages";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const pathname = usePathname();
  const [pageID, setPageID] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  // console.log(pageID);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const data = pageDetails.find((page) => page.location === pathname);
    // console.log(pathname);
    // console.log(data);
    if (data) {
      setPageID(data.id);
    } else {
      setPageID(0);
    }
  }, [pathname]);

  return (
    <GlobalContext.Provider value={{ pathname, pageID, isMobile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

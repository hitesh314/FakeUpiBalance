import { createContext, useContext, useState } from "react";

const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayContent, setOverlayContent] = useState("");

  const openOverlayWithContent = (content) => {
    setOverlayContent(content);
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setIsOpen(false);
    setOverlayContent("");
  };

  return (
    <OverlayContext.Provider
      value={{ isOpen, overlayContent, openOverlayWithContent, closeOverlay }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => useContext(OverlayContext);

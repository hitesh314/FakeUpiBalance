import { useEffect, useState } from "react";

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > lastScrollPos) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);

  return scrollDirection;
};

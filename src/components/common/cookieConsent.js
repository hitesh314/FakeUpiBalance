"use client";

import { useState, useEffect } from "react";
import { useOverlayContext } from "@/../../context/overlayContext";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { openOverlayWithContent } = useOverlayContext();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    openOverlayWithContent("PersonalisedParenting");
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-4 flex flex-col md:flex-row justify-between items-center z-50">
      <p className="text-sm mb-2 md:mb-0 md:mr-4">
        We use cookies to improve your experience and analyze usage. By clicking
        "Accept", you consent to our use of cookies.{" "}
      </p>
      <div className="flex space-x-2">
        <button
          onClick={handleAccept}
          className="bg-primary text-white font-semibold px-4 py-2 rounded"
        >
          Accept
        </button>
        <button onClick={handleReject} className="bg-white  px-4 py-2 rounded">
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;

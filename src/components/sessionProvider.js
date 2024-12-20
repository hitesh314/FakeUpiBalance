"use client";
import { SessionProvider } from "next-auth/react";
import { OverlayProvider } from "../../context/overlayContext";
import { SurveyProvider } from "../../context/surveyContext";
import { GlobalProvider } from "../../context/globalContext";

export default function SessionProviderClient({ children }) {
  return (
    <GlobalProvider>
      <SessionProvider>
        <SurveyProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </SurveyProvider>
      </SessionProvider>
    </GlobalProvider>
  );
}

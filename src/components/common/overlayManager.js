"use client";
import { useOverlayContext } from "../../../context/overlayContext";
import Modal from "@/components/overlays/overlay";
import TermsAndConditions from "../overlays/termsAndConditions";
import RunningLateOverlay from "../overlays/runningLate";
import ForbiddenEntry from "../overlays/forbiddenEntry";
import SignIn from "../overlays/signIn";
import PartnerShare from "../overlays/partnerShareReview";
import PersonalisedParenting from "../overlays/parentingPersonalisation";

const ModalManager = () => {
  const { isOpen, overlayContent, closeOverlay } = useOverlayContext();

  return (
    <>
      {isOpen && (
        <Modal>
          {overlayContent === "TermsAndConditions" && (
            <TermsAndConditions onClose={closeOverlay} />
          )}
          {overlayContent === "RunningLateOverlay" && (
            <RunningLateOverlay onClose={closeOverlay} />
          )}
          {overlayContent === "ForbiddenEntry" && (
            <ForbiddenEntry onClose={closeOverlay} />
          )}
          {overlayContent === "SignIn" && <SignIn onClose={closeOverlay} />}
          {overlayContent === "PartnerShareReview" && (
            <PartnerShare onClose={closeOverlay} />
          )}
          {overlayContent === "PersonalisedParenting" && (
            <PersonalisedParenting onClose={closeOverlay} />
          )}
        </Modal>
      )}
    </>
  );
};

export default ModalManager;

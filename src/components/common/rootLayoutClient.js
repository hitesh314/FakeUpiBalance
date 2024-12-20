import SessionProviderClient from "../sessionProvider";
import Navbar from "./navbar";
import MobileNavbar from "./navbarMobile";

export default function RootLayoutClient({ children }) {
  return (
    <>
      <SessionProviderClient>
        <MobileNavbar />
        <Navbar />
        {children}
      </SessionProviderClient>
    </>
  );
}

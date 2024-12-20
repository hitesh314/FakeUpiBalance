import { Poppins } from "next/font/google";
import SessionProviderClient from "@/components/sessionProvider";
import MobileNavbar from "@/components/common/navbarMobile";
import Navbar from "@/components/common/navbar";
import MobileFooter from "@/components/common/mobileFooter";
import Footer from "@/components/common/footer";
import navbarStyles from "@/styles/navbar.module.css";
import "@/styles/globals.css";
import ModalManager from "@/components/common/overlayManager";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export function generateMetadata(options) {
  const {
    title = "Aid and Heal",
    description = "Empowering your mental wellbeing",
  } = options || {};

  return {
    title,
    description,
    icons: {
      icon: "/images/aidAndHealLogoFavicon.png",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${poppins.className} ${navbarStyles.fullScreenBody}`}
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        suppressHydrationWarning={true}
      >
        <SessionProviderClient>
          {/* <MobileNavbar /> */}
          <Navbar />
          <ModalManager />
          {children}
          <MobileFooter />
          <Footer />
        </SessionProviderClient>
      </body>
    </html>
  );
}

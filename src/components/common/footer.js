import Image from "next/image";
// import Link from "next/link";
import styles from "@/styles/footer.module.css";
// import { FaFacebook } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.heading}>
        <div className={styles.logoSection}>
          <Image
            src="/images/aidAndHealLogo.png"
            alt="Aid and Heal Logo"
            width={220}
            height={112}
            className={styles.footerLogo}
          />
          {/* <span className={styles.footerLogoTitle}> Aid and Heal</span> */}
        </div>
        {/* <div>
          <Image
            src="/images/SocialMedia.svg"
            width={328}
            height={64}
            alt="social media share"
          />
        </div>*/}
      </div>
      {/* This portion is left for the Other Links */}
      {/* <hr className={styles.hrStyle}></hr>
      <div>Footer 2</div> */}
      <hr className={styles.hrStyle}></hr>
      <div className={styles.lowerSection}>
        {/* <div> */}
        {/* <div className={styles.footerNav}>
            <Link href="/">About Us</Link>
            <span>|</span>
            <Link href="/">Contact Us</Link>
            <span>|</span>
            <Link href="/">Privacy Policy</Link>
          </div> */}
        {/* </div> */}
        <div>@ 2024 AidandHeal</div>
        {/* <Image
          src="/images/GooglePlayDesktop.svg"
          alt="Google Play"
          width={196}
          height={56}
          // layout="responsive"
          className={styles.googlePlay}
        /> */}
      </div>
    </footer>
  );
};

export default Footer;

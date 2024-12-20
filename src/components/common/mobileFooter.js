import Image from "next/image";
import styles from "@/styles/mobileFooter.module.css";

const MovileFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Image
          src="/images/aidAndHealLogo.png"
          alt="Aid and Heal Logo"
          width={160}
          height={80}
          // className={styles.footerLogo}
        />
        {/* <h1 className={styles.footerTitle}>Aid and Heal</h1> */}
      </div>
      {/* <div className={styles.socialMedia}> */}
      {/* <Link href="https://wa.me/your-whatsapp-link">
          <FaTwitter size={32} color="#000" />
        </Link>
        <Link href="https://www.messenger.com/t/your-messenger-link">
          <FaFacebook size={32} color="#000" />
        </Link>
        <Link href="https://www.instagram.com/your-instagram-link">
          <FaInstagram size={32} color="#000" />
        </Link>
        <Link href="https://your-chat-link.com">
          <FaWhatsapp size={32} color="#000" />
        </Link> */}

      {/* <Image
          src="/images/SocialMedia.svg"
          width={202}
          height={32}
          alt="Aid and Heal social media"
        /> */}
      {/* </div> */}
      {/* <div className={styles.footerNav}>
        <div href="/">About Us</div>
        <span>|</span>
        <div href="/">Contact Us</div>
        <span>|</span>
        <div href="/">Privacy Policy</div>
      </div> */}
      <div className={styles.footerBottom}>
        <p>@ 2024 Aid and Heal</p>
        {/* <Image
          src="/images/GooglePlay.svg"
          width={264}
          height={40}
          layout="responsive"
          alt="Google Play"
          styles={{ height: "100%", width: "60%" }}
        /> */}
      </div>
    </footer>
  );
};

export default MovileFooter;

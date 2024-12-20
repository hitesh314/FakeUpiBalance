import styles from "@/styles/homepageBanner.module.css";
import Image from "next/image";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";

const AidAndHealBanner = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(/images/bannerHomepgeBackground.jpg)`,
        }}
        className={styles.bannerContainerDesktop}
      >
        <div className={styles.bannerFrame}>
          <div className={styles.bannerFrameImage}>
            <Image
              src="/images/LandingPageBanner_dump.svg"
              layout="responsive"
              width={328}
              height={248}
              alt="survey banner image"
              className={styles.bannerImages}
            />
          </div>
          <div className={styles.textContainer}>
            <h2>Start Healing Now</h2>
            <p>
              Empowering Minds, Nurturing Wellbeing Your Journey to Mental
              Wellness Starts Here
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AidAndHealBanner;

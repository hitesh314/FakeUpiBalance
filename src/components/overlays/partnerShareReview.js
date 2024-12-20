import Image from "next/image";
import styles from "@/styles/partnerShareReview.module.css";

export default function PartnerShare(props) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.textWrapper}>
          <div className={styles.centeredText}>
            <div className={styles.title}>
              Your partner has requested that you fill the survey.
            </div>
          </div>
        </div>
        <hr className={styles.hrStyle}></hr>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <Image
              src="/images/PartnerShareReview.svg"
              alt="Partner Share Review"
              layout="responsive"
              width="320"
              height="320"
            />
          </div>
        </div>
        <div className={styles.button} onClick={() => props.onClose()}>
          Continue
        </div>
      </div>
    </div>
  );
}

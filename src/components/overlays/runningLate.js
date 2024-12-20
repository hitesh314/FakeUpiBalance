import Image from "next/image";
import styles from "@/styles/runningLate.module.css";

export default function RunningLateOverlay({ onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <Image
              src="/images/timeoutError.svg"
              alt="Your Logo"
              layout="responsive"
              width="320"
              height="320"
            />
          </div>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.centeredText}>
            <div className={styles.title}>Hurry Up!</div>
            <hr className={styles.hrStyle}></hr>
          </div>
          <div className={styles.warningText}>
            You will be redirected to{" "}
            <span
              className={styles.warningHighlight}
              onClick={() => window.location.reload()}
            >
              Restart
            </span>{" "}
            the entire survey if it is not completed within the allocated time.
          </div>
          <div className={styles.button} onClick={onClose}>
            Continue With Survey
          </div>
        </div>
      </div>
    </div>
  );
}

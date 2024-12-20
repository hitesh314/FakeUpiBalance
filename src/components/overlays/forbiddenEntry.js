import Image from "next/image";
import styles from "@/styles/forbiddenEntry.module.css";

export default function ForbiddenEntry(props) {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.imageWrapper}>
          <div className={styles.image}>
            <Image
              src="/images/forbidden.png"
              alt="Your Logo"
              layout="responsive"
              width="320"
              height="320"
            />
          </div>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.centeredText}>
            <div className={styles.title}>We’re Sorry</div>
            <hr className={styles.hrStyle}></hr>
          </div>
          <div className={styles.warningText}>
            You{" "}
            <span className={styles.warningHighlight}>
              can’t skip a question.
            </span>{" "}
            We request you to answer all the question’s for a precise analysis.
          </div>
          <div className={styles.button} onClick={() => props.onClose()}>
            Continue With Survey
          </div>
        </div>
      </div>
    </div>
  );
}

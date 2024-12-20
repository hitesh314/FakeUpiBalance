import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import styles from "@/styles/signIn.module.css";
import { signIn } from "next-auth/react";

export default function SignIn(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.title}>Please Sign In</div>
          <div className={styles.closeButton} onClick={() => props.onClose()}>
            <IoCloseOutline size={32} />
          </div>
        </div>
        <hr className={styles.hrStyle}></hr>
      </div>
      <div className={`${styles.image}`}>
        <Image
          src="/images/signInAfterSubwey.svg"
          alt="Sign In To Aid and Heal"
          layout="responsive"
          width="320"
          height="320"
        />
      </div>
      <div className={styles.description}>
        It seems that you have not signed it yet. Kindly{" "}
        <span className={styles.highlightText}>Sign in</span> for the submission
        of your survey.
      </div>
      <div className={styles.signInButton} onClick={() => signIn("google")}>
        <div type="button" className={styles.googleButtonSignIn}>
          <Image
            src="/images/google.png"
            alt="Google Sign In Logo"
            width="32"
            height="32"
          />
          Sign in with Google
        </div>
      </div>
    </div>
  );
}

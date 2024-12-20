"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/termsAndConditions.module.css";

export default function TermsAndConditions(props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Terms And Condition's</div>
        <hr className={styles.hrStyle}></hr>
      </div>
      <div className={`${styles.image}`}>
        <Image
          src="/images/signInTermsAndConditions.svg"
          alt="Thanks for filling out the form"
          layout="responsive"
          width={320}
          height={320}
        />
      </div>
      <ul className={styles.list}>
        <li>
          There are a total of 15 questions and you will have 15 minutes to
          finish the survey.
        </li>
        <li>The analysis will be based on our in-house algorithm.</li>
      </ul>

      <div className={styles.footer}>
        <hr className={styles.hrStyle}></hr>
        <div className={styles.checkboxContainer}>
          <input
            id="terms-checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <label htmlFor="terms-checkbox" className={styles.checkboxLabel}>
            I agree to the Terms mentioned above.
          </label>
        </div>
      </div>
      <div
        className={styles.startButton}
        onClick={() => {
          if (!isChecked) {
            document.getElementById("terms-checkbox").focus();
            return;
          } else {
            props.onClose();
          }
        }}
      >
        Start Survey
      </div>
    </div>
  );
}

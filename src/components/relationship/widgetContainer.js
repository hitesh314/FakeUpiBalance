// @ts-nocheck
import styles from "@/styles/widgetContainer.module.css";
import Image from "next/image";
import Link from "next/link";

const Widgets = (props) => {
  return (
    <div id="aidandheal" className={styles.surveysGrid}>
      {props?.surveyList?.map((survey) => (
        <div
          key={survey.id}
          style={{ "--survey-primary-color": survey.surveyPrimaryColor }}
          className={`${styles.surveyCard} ${
            survey.isAvailable ? styles.availableWidgets : styles.comingSoon
          }`}
        >
          <div className={styles.widgetCardDetail}>
            <div className={styles.surveyImage}>
              <Image
                src={survey.surveyImage}
                // width={120}
                // height={72}
                // layout="responsive"
                fill={true}
                alt="Aid and Heal survey widget"
              />
            </div>
            <div className={styles.bannerText}>
              <span className={styles.compatibilityTitle}>
                {survey.surveyTitle}
              </span>
              {/* <hr className={styles.hrStyle} /> */}
              <span className={styles.compatibilityText}>
                {survey.compatibilityTitle}
              </span>
              {/* {survey.isAvailable && (
              <Link href="#aidandheal" className={styles.startSurveyButton}>
              Try <strong> Aid and Heal</strong>
              </Link>
              )} */}
              {!survey.isAvailable && (
                <span className={styles.comingSoonBadge}>Coming Soon </span>
              )}
            </div>
          </div>
          {survey.isAvailable ? (
            <Link href={survey.redirectUrl} className={styles.tryNowButton}>
              Try Now
            </Link>
          ) : (
            <span className={styles.tryNowButton}>Try Now</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Widgets;

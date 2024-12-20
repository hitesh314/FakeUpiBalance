"use client";
import pageDetails from "../../../public/data/about-pages.json";
import styles from "@/styles/aboutPage.module.css";
import { useGlobalContext } from "@/../../context/globalContext";

export default function PageDetails({ pageId }) {
  const { pageID } = useGlobalContext();
  const data =
    typeof pageId === "number"
      ? pageDetails.find((page) => page.id === pageId)
      : pageID !== 0
      ? pageDetails.find((page) => page.id === pageID)
      : null;
  if (!data || !data.sections) {
    return <p></p>;
  }

  return (
    <div className={styles.aboutPage}>
      <ul className={styles.sectionList}>
        <>
          {/* Render the first heading and content */}
          {data.sections.length > 0 && (
            <li key={0} className={styles.sectionItem}>
              <h1 className={styles.sectionHeadingH1}>
                {data.sections[0].heading}
              </h1>
              <span className={styles.subSection}>
                {data.sections[0].content}
              </span>
            </li>
          )}

          {/* Render the rest of the sections */}
          {data.sections.slice(1).map((subSection, subIndex) => (
            <li key={subIndex + 1} className={styles.sectionItem}>
              <h2 className={styles.sectionHeading}>{subSection.heading}</h2>
              <span className={styles.subSection}>{subSection.content}</span>
            </li>
          ))}
        </>
      </ul>
    </div>
  );
}

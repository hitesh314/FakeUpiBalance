import Image from "next/image";
import styles from "@/styles/blogCard.module.css";
import Link from "next/link";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { truncateText } from "@@/utils/commonAlteration/textContacinate";
export default async function BlogCard({ data }) {
  return (
    <>
      {data ? (
        <Link href={`/${data.slug}`} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              src={data.image}
              alt="card-image"
              className={styles.blogImage}
              fill
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(512, 288)
              )}`}
            />
          </div>
          <div className={styles.content}>
            <span className={styles.title}>{data.title}</span>
            <p className={`${styles.description} hidden md:block`}>
              {truncateText(data.description, 25)}
            </p>{" "}
          </div>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}

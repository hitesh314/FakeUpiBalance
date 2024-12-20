import Image from "next/image";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import styles from "@/styles/postPage.module.css";
import Link from "next/link";
export default function FeaturedCard({ post }) {
  return post ? (
    <Link
      href={`/${post.slug}`}
      className="rounded-lg overflow-hidden  cursor-pointer md:max-w-[360px] flex flex-col gap-4 md:gap-8"
    >
      <div className={styles.imageContainerFeaturedCard}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className={styles.featureCardImage}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(360, 360)
          )}`}
        />
      </div>
      <h2 className="text-3xl md:text-4xl font-normal">{post.title}</h2>
      <p className="text-xl text-gray-600">{post.description}</p>
    </Link>
  ) : (
    <></>
  );
}

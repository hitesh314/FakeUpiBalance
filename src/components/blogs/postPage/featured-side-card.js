import Image from "next/image";
import styles from "@/styles/postPage.module.css";
import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Link from "next/link";

export default function SideCard({ post }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="bg-white rounded-lg cursor-pointer flex flex-col md:flex-row gap-2"
    >
      <div className={styles.imageContainerSideCard}>
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
      <div className="flex flex-col justify-between md:p-4 md:max-w-64">
        <h3 className="text-xl font-normal mb-2">{post.description}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={post.profiles.avatar_url || ""}
              height={24}
              width={24}
              alt={"Avatar"}
              className="flex h-[24px] w-[24px] rounded-full object-cover shadow-sm"
              priority
              placeholder="blur"
              blurDataURL={shimmer(24, 24)}
            />
            <h3 className="text-xs ">{post.profiles.full_name}</h3>
          </div>
          <div className="text-xs">
            {format(parseISO(post.updated_at), "MMMM dd, yyyy")}
          </div>
        </div>
        {/* <p className="text-gray-600 text-sm">{post.summary}</p> */}
      </div>
    </Link>
  );
}

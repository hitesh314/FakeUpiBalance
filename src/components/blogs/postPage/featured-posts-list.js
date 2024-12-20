import Image from "next/image";
import styles from "@/styles/postPage.module.css";
import { shimmer, toBase64 } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import selectRandomItems from "@@/utils/commonAlteration/randomiseArray";

// export const revalidate = 10000;

export default function FeaturedPostList({ pagePosts, featureTitle }) {
  var featuredPosts = pagePosts;
  return featuredPosts ? (
    <div className="">
      <h2 className="text-[24px] md:text-[40px] font-normal">{featureTitle}</h2>
      <div className="flex flex-col gap-8 py-6">
        {featuredPosts.map((post) => (
          <Link
            href={`/${post?.slug}`}
            key={uuidv4()}
            className="rounded-lg cursor-pointer gap-4 flex w-[100%] md:w-1/2 lg:w-1/4 min-w-[100%] flex-col md:flex-row"
          >
            {/* Image Container */}
            <div className={styles.imageContainerSideCardFeaturedPosts}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className={styles.featureCardImage}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(360, 360)
                )}`}
              />
            </div>

            {/* Post Details */}
            <div className="md:p-4 flex flex-col justify-between">
              <h3 className="text-[14px] md:text-xl font-normal mb-2">
                {post.description}
              </h3>

              {/* Author and Date */}
              <div className="flex items-center justify-between gap-1 min-w-[90%]">
                <div className="flex items-center space-x-2">
                  <Image
                    src={post.profiles.avatar_url || "/default-avatar.png"}
                    alt={post.profiles.full_name}
                    width={24}
                    height={24}
                    className="rounded-full object-cover shadow-sm"
                    priority
                    placeholder="blur"
                    blurDataURL={toBase64(shimmer(24, 24))}
                  />
                  <span className="text-xs">{post.profiles.full_name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {format(parseISO(post.updated_at), "MMMM dd, yyyy")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}

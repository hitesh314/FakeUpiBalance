import Image from "next/image";
import styles from "@/styles/postPage.module.css";
import { shimmer, toBase64 } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
export default function MustReadPosts({ pagePosts }) {
  // Extract the posts you want to display
  const featuredPosts = pagePosts;

  return featuredPosts ? (
    <>
      <h2 className="text-2xl md:text-4xl font-normal mb-6 max-w-[95%]">
        Must Reads
      </h2>
      <div className="flex flex-wrap gap-8 max-w-[95%]">
        {featuredPosts.map((post) => (
          <Link
            href={`/${post.slug}`}
            key={uuidv4()}
            className="  @apply bg-white rounded-lg cursor-pointer flex w-full gap-4 md:gap-0 md:w-1/2 lg:w-1/4 md:min-w-[470px]"
          >
            {/* Image Container */}
            <div className={styles.imageContainerSideCardMustRead}>
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
            <div className="md:pl-4 flex flex-col gap-[12px] justify-around max-w-[50%]">
              <h3 className="text-[14px] md:text-base font-normal mb-2">
                {post.description}
              </h3>

              {/* Author and Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image
                    src={post.profiles.avatar_url || "/default-avatar.png"}
                    alt={post.profiles.full_name}
                    width={24}
                    height={24}
                    className="rounded-full object-cover shadow-sm"
                    priority
                    // placeholder="blur"
                    // blurDataURL={toBase64(shimmer(24, 24))}
                  />
                  <span className="text-[12px] md:text-xs">
                    {post.profiles.full_name}
                  </span>
                </div>
                <span className="text-[12px] md:text-xs text-gray-500">
                  {format(parseISO(post.updated_at), "MMMM dd, yyyy")}
                </span>
              </div>

              {/* Optional Summary */}
              {/* <p className="text-gray-600 text-sm">{post.summary}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <></>
  );
}

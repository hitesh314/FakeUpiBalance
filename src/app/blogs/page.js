import { cookies } from "next/headers";
import { createClient } from "@@/utils/supabase/server";
import { notFound } from "next/navigation";
import {
  FeaturedCard,
  SideCard,
  TopicsList,
  MustReads,
  FeaturedPostList,
} from "@/components/blogs/postPage";
import styles from "@/styles/blogPage.module.css";
import { v4 as uuidv4 } from "uuid";
import selectRandomItems from "@/../utils/commonAlteration/randomiseArray";
import { seoDataBlogs } from "@@/config/root/seo";

export function generateMetadata(options) {
  const {
    title = seoDataBlogs.title,
    description = seoDataBlogs.description,
    url = "https://www.aidandheal.com/blog",
    image = "https://www.aidandheal.com/images/aidAndHealLogoFavicon.png",
    icons,
    structuredData = null,
    ...rest
  } = options || {};

  return {
    title,
    description,
    keywords: seoDataBlogs.keywords.join(", "),
    authors: [{ name: seoDataBlogs.author.name }],
    icons: {
      icon: "/images/aidAndHealLogoFavicon.png",
    },
    openGraph: {
      title: seoDataBlogs.ogTitle,
      description,
      type: "website",
      url,
      siteName: seoDataBlogs.absoluteTitle,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoDataBlogs.ogTitle,
      description,
      images: [image],
    },
    structuredData: structuredData ? JSON.stringify(structuredData) : undefined,
    ...rest,
  };
}

export const revalidate = 2.592e6;
async function getPosts() {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("posts")
      .select(
        `id, title, image, description, slug, category_id, created_at, updated_at, author_id, published, isSuggested, categories(*), profiles(*)`
      )
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function getUniqueCategories(items) {
  // Use reduce to collect unique categories
  const uniqueCategories = items?.reduce((acc, item) => {
    // Check if the category already exists in the accumulator
    if (!acc.some((category) => category.id === item.categories.id)) {
      acc.push(item.categories);
    }
    return acc;
  }, []);

  return uniqueCategories;
}

export default async function Home() {
  let pagePosts = await getPosts();
  let postCategories = getUniqueCategories(pagePosts);
  if (!pagePosts || !pagePosts.length) {
    return notFound();
  }

  if (!pagePosts) {
    return notFound();
  }
  return pagePosts ? (
    <div className="flex flex-col gap-8 md:gap-8 py-2 md:py-8 px-4 container mx-auto">
      {/* Featured Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-2/5">
          <FeaturedCard post={pagePosts[0]} />
        </div>
        <div className="w-full md:w-3/5 flex flex-col gap-8">
          {pagePosts.slice(1, 4).map((post) => (
            <SideCard key={uuidv4()} post={post} />
          ))}
        </div>
      </div>

      <hr className={styles.hrStyle} />

      {/* Topics List */}
      <div className="max-w-5xl md:mx-auto">
        <TopicsList topics={postCategories} />
      </div>

      <hr className={styles.hrStyle} />

      {/* Must Reads */}
      <div className="max-w-5xl mx-auto">
        <MustReads pagePosts={pagePosts.reverse().slice(0, 4)} />
      </div>

      <hr className={styles.hrStyle} />

      {/* Featured Posts List */}
      <div className="max-w-5xl mx-auto">
        <FeaturedPostList
          pagePosts={selectRandomItems(pagePosts)}
          featureTitle="Featured Stories"
        />
      </div>
    </div>
  ) : (
    <></>
  );
}

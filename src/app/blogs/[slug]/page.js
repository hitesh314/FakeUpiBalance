import BlogList from "@/components/blogs/blog-grid";
import PostPage from "@/components/pages/blogPreview";
import { createClient } from "@/../../utils/supabase/server";
import { cookies } from "next/headers";
import { getOgImageUrl, getUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import { relativeTimeRounding } from "moment";
export const revalidate = 2.592e6;

export async function generateMetadata({ params }) {
  let { slug } = params;

  const post = await getPost(slug);
  const truncateDescription = post?.meta_desciption?.slice(0, 100) + "...";

  return {
    title: post?.meta_title,
    description: truncateDescription,
    authors: {
      name: post?.profiles?.full_name,
    },
    openGraph: {
      title: post?.meta_title,
      description: post?.meta_desciption,
      type: "article",
      url: getUrl() + slug,
      images: [
        {
          url: getOgImageUrl(
            post?.title,
            truncateDescription,
            [post?.categories?.title],
            slug
          ),
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.description,
      images: [
        getOgImageUrl(
          post?.title,
          truncateDescription,
          [post?.categories?.title],
          slug
        ),
      ],
    },
  };
}

async function getPost(slug) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase
      .from("posts")
      .select(`*, categories(*), profiles(*)`)
      .match({ slug: slug, published: true })
      .single();

    if (!data) {
      notFound();
    }

    return data;
  } catch (error) {
    console.log(slug);
  }
}

export default async function SlugPage({ params, searchParams }) {
  let { slug } = params;
  const postData = await getPost(slug);
  return (
    <div className=" max-w-[100%] sm:container sm:mx-auto">
      <PostPage postDetails={postData} />
    </div>
  );
}

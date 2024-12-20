import { createClient } from "@/../../utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FeaturedPostList } from "@/components/blogs/postPage";

// export const revalidate = 2.592e6;
async function getPost(params) {
  const slug = params?.category;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const response = await supabase
    .from("posts")
    .select(
      `id, title, image, description, slug, category_id, created_at, updated_at, author_id, published, isSuggested, categories(*), profiles(*)`
    )
    .eq("published", true);

  if (!response.data) {
    notFound();
  }

  return response.data;
}

export default async function PostPage({ params }) {
  // Get post data
  var post = await getPost();
  if (!post) {
    notFound();
  }

  // Get comments
  return (
    <div>
      {/* Featured Posts List */}
      <div className="max-w-5xl mx-auto">
        <FeaturedPostList featureTitle={"Relationship"} pagePosts={post} />
      </div>
    </div>
  );
}

// @ts-nocheck
import BlogCard from "./blog-card";
import styles from "@/styles/blogGrid.module.css";
import { createClient } from "@/../utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 2.592e6;
export default async function BlogList(params) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { count } = await supabase
    .from("posts")
    .select(
      `id, title, image, description, slug, category_id, created_at, updated_at, author_id, published, isSuggested, categories(*), profiles(*)`,
      { count: "exact", head: true }
    );

  const { data, error } = await supabase
    .from("posts")
    .select(
      `id, title, image, description, slug, category_id, created_at, updated_at, author_id, published, isSuggested, categories(*), profiles(*)`
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  const jsonData = JSON.stringify(data);

  // Calculate byte size
  const byteSize = Buffer.byteLength(jsonData, "utf8");

  // console.log(`Fetched Data Size: ${byteSize} bytes`);

  if (!data || error || !data.length) {
    return notFound();
  }
  return (
    <div className={styles.container}>
      <span className={styles.blogSectionText}>{params.title}</span>
      <hr className={styles.hrStyle} />
      <div className={styles.blogList}>
        {data.map((item, index) => (
          <div key={index} className={styles.blogItem}>
            <BlogCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

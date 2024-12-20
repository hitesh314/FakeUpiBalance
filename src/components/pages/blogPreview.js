import React, { Suspense } from "react";
import { DetailPostHeading } from "@/components/blogs/post";
import { DetailPostShareButton } from "@/components/blogs/post/buttons";
import { format, parseISO } from "date-fns";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { v4 as uuidv4 } from "uuid";
import BlogList from "@/components/blogs/blog-grid";
import {
  DetailPostLoading,
  DetailPostFloatingBar,
} from "@/components/blogs/post";

export const revalidate = 2.592e6;

const PostContent = async ({ postDetails }) => {
  const readTime = readingTime(postDetails.content || "");

  return (
    <div className="min-h-full py-3">
      <div className=" flex flex-col justify-center align-center md:px-4 px-2 max-w-7xl">
        <div className="mx-auto max-w-full sm:max-w-4xl">
          <div className="mx-auto max-w-full sm:max-w-4xl rounded-2xl bg-white px-2 md:px-6 py-4 sm:px-14 sm:py-10 ring-1 ring-black/5 border border-gray-200">
            <div className="relative mx-auto max-w-full sm:max-w-4xl py-2">
              {/* Post Heading */}
              <DetailPostHeading
                key={uuidv4()}
                id={postDetails?.id}
                title={postDetails?.title}
                image={postDetails?.image}
                authorName={postDetails?.profiles?.full_name}
                authorImage={postDetails?.profiles?.avatar_url}
                date={format(
                  parseISO(postDetails?.updated_at),
                  "EEEE, MMM d, yyyy"
                )}
                category={postDetails?.categories?.title}
                readTime={readTime}
              />
            </div>
            {/* Post Content */}
            <div className="relative mx-auto max-w-full sm:max-w-3xl border-slate-500/50 py-5">
              <div
                className="prose prose-sm sm:prose lg:prose-lg"
                dangerouslySetInnerHTML={{ __html: postDetails.content || "" }}
              />
            </div>
            {/* Share Button */}
            <div className="flex justify-center w-full max-w-full sm:max-w-48 col-span-3 mt-4">
              <DetailPostShareButton
                title={postDetails.title}
                text={postDetails.description}
                url={`/posts/${postDetails.slug}`}
              />
            </div>
          </div>
        </div>
        {/* Latest Blogs Section */}
        {/* <div className="max-w-7xl"> */}
        <BlogList title="Latest Blogs" />
        {/* </div> */}
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <DetailPostLoading />
    </>
  );
};

const PostPage = ({ postDetails }) => {
  return (
    <Suspense fallback={<Loading />}>
      <PostContent postDetails={postDetails} />
    </Suspense>
  );
};

export default PostPage;

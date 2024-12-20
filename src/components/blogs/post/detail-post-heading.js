import { getMinutes, shimmer, toBase64 } from "@/lib/utils";
import { createClient } from "@/../../utils/supabase/server";
import { ArchiveIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { DetailPostShareButton } from "@/components/blogs/post/buttons";
async function getPublicImageUrl(postId, fileName) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const bucketName =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS || "posts";
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${postId}/${fileName}`);

  if (data && data.publicUrl) return data.publicUrl;

  return "/images/not-found.jpg";
}

const DetailPostHeading = ({
  id,
  title,
  image,
  authorName,
  authorImage,
  date,
  category,
  readTime,
}) => {
  return (
    <section className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <Image
          src={image || ""}
          alt={title}
          width={512}
          height={288}
          className="h-[400px] w-full rounded-2xl bg-gray-100 object-cover"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(512, 288)
          )}`}
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="w-full">
        <h1 className="my-5 text-left text-[20px] sm:text-[32px] font-medium leading-[30px] sm:leading-[48px] text-gray-900 font-poppins">
          {" "}
          {title}
        </h1>

        {/* Mobile view */}
        <div className="mb-5 grid grid-cols-3 gap-2 rounded-md border border-gray-100 px-3 py-2.5 text-gray-500 sm:hidden">
          {/* Author */}
          <div className="inline-flex items-start justify-start">
            <Image
              src={authorImage || ""}
              height={24}
              width={24}
              alt={authorName || "Avatar"}
              className="flex h-[24px] w-[24px] rounded-full object-cover shadow-sm"
              priority
              placeholder="blur"
              blurDataURL={shimmer(24, 24)}
            />
            <div className="ml-2 flex flex-col">
              <span className="text-xs flex font-semibold text-gray-500">
                {authorName}
              </span>
            </div>
          </div>

          {/* Date */}
          <div className="inline-flex space-x-2 border-gray-400 border-opacity-50">
            <p className="mt-0.5">
              <span className="sr-only">Date</span>
              <CalendarIcon
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </p>
            <span className="text-xs">{date}</span>
          </div>

          {/* Reading time */}
          <div className="inline-flex space-x-2 border-gray-400 border-opacity-50">
            <p className="mt-0.5">
              <span className="sr-only">Minutes to read</span>
              <ClockIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </p>
            <span className="text-xs">{getMinutes(readTime.minutes)}</span>
          </div>

          {/* Share Button (appears below the other items) */}
          <div className="col-span-3 mt-4">
            {/* <button className="w-full rounded-full bg-green-500 py-2 text-white hover:bg-green-600"> */}
            <DetailPostShareButton title={"title"} text={""} url={"url"} />
            {/* Share */}
            {/* </button> */}
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden mb-7 md:flex justify-between items-center">
          {/* Author */}
          <div className="justify-start text-gray-500 sm:flex sm:flex-row">
            <div className="mb-5 flex flex-row items-start justify-start pr-3.5 md:mb-0">
              <Image
                src={authorImage || ""}
                height={24}
                width={24}
                alt={authorName || "Avatar"}
                className="flex h-[24px] w-[24px] rounded-full object-cover shadow-sm"
                priority
                placeholder="blur"
                blurDataURL={shimmer(24, 24)}
              />
              <div className="ml-2 flex flex-col">
                <span className="text-md flex font-semibold text-gray-900">
                  {authorName}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center">
              {/* Date */}
              <div className="flex space-x-2 border-gray-400 border-opacity-50 pl-0 pr-3.5 md:border-l md:pl-3.5">
                <p className="mt-0.5">
                  <span className="sr-only">Date</span>
                  <CalendarIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </p>
                <span className="text-sm">{date}</span>
              </div>
              {/* Category */}
              {/* <div className="flex space-x-2 border-l border-gray-400 border-opacity-50 pl-3.5 pr-3.5">
              <p className="mt-0.5">
                <span className="sr-only">Category</span>
                <ArchiveIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </p>
              <span className="text-sm">{category}</span>
            </div> */}
              {/* Reading time */}
              <div className="flex space-x-2 border-l border-gray-400 border-opacity-50 pl-3.5">
                <p className="mt-0.5">
                  <span className="sr-only">Minutes to read</span>
                  <ClockIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </p>
                <span className="text-sm">{getMinutes(readTime.minutes)}</span>
              </div>
            </div>
          </div>
          <div style={{ width: "240px", color: "#0E8E72" }}>
            <DetailPostShareButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPostHeading;

import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export default function TopicsList({ topics }) {
  // console.log(topics);
  return (
    <div className="text-left w-full max-w-[360px] md:max-w-full">
      <h2 className="text-2xl md:text-4xl font-normal mb-2 md:mb-6 md:min-w-[1024px]">
        Browse Articles
      </h2>
      <div className="flex gap-4 md:gap-20 overflow-x-auto overflow-y-hidden md:w-full">
        {topics.map((topic) => (
          <Link
            href={`/blogs/collection`}
            key={uuidv4()}
            className="flex flex-col gap-1 min-w-[140px] md:min-w-[180px] flex-shrink-0"
          >
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border border-slate-200 overflow-hidden bg-white">
              <Image
                src={topic.type_url || "/default-image.png"}
                alt={topic.title || "topic-name"}
                className="object-cover w-full h-full"
                width={160}
                height={160}
              />
            </div>
            <p className="text-base md:text-2xl font-normal mt-4 text-gray-500 text-center">
              {topic.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

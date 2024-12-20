// components/ToolCard.js
import Image from "next/image";
import Link from "next/link";

export default function ToolCard({
  title,
  description,
  link,
  imagePath,
  comingSoon,
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-5 ${
        comingSoon ? "opacity-50" : ""
      }`}
    >
      <div className="relative h-32 w-full">
        <Image
          src={imagePath}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="mx-auto"
        />
      </div>
      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        {comingSoon ? (
          <span className="text-sm text-green-500 font-semibold">
            Coming Soon
          </span>
        ) : (
          <Link
            href={link}
            className="inline-block bg-blue-500 text-white mt-4 py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try now
          </Link>
        )}
      </div>
    </div>
  );
}

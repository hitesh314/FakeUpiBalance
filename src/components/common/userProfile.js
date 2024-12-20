import Image from "next/image";
import { MdVerified } from "react-icons/md";
export default function ProfileCard({
  name,
  title,
  rating,
  students,
  courses,
  reviews,
  description,
  avatarUrl,
}) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-sm p-6">
      <div className="flex items-center">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image src={avatarUrl} alt={name} layout="fill" objectFit="cover" />
        </div>
        <div className="flex-1 ">
          <a
            href="https://www.google.com"
            className="flex items-center mb-1 cursor-pointer hover:underline"
          >
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            {/* Verified badge (example) */}
            <MdVerified />
          </a>
          <p className="text-sm text-gray-600">{title}</p>
          <div className="flex items-center text-sm text-[#0E8E72] mt-1">
            <span className="font-semibold">{rating}</span>
            <svg className="w-4 h-4 fill-current ml-1" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.446L24 9.67l-6 5.848L19.335 24 12 20.017 4.665 24 6 15.518 0 9.67l8.332-1.638L12 .587z" />
            </svg>
            <span className="ml-1">Instructor Rating</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6 text-center">
        <div>
          <p className="text-lg font-bold text-gray-800">
            {students.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Followers</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-800">{courses}</p>
          <p className="text-xs text-gray-500">Articles</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-800">
            {reviews.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Views</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

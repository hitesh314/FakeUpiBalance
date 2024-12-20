"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { babyNameSearch } from "@@/config/parenting/baby-suggestion-box";
import { useRouter } from "next/navigation";
import { useSurveyContext } from "@@/context/surveyContext";

export default function BabyNameSearch() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const router = useRouter();
  const { searchBabyMeaning } = useSurveyContext();

  const baseUrlBackend = process.env.BASE_URL_API;
  const placeholders = babyNameSearch.babyNamePlaceholder;

  useEffect(() => {
    const currentPlaceholder = placeholders[currentIndex];
    let timeout;

    if (typing) {
      if (displayText.length < currentPlaceholder.length) {
        timeout = setTimeout(() => {
          setDisplayText(
            (prev) => prev + currentPlaceholder.charAt(prev.length)
          );
        }, 150);
      } else {
        // Start erasing after a delay
        timeout = setTimeout(() => {
          setTyping(false);
        }, 1000); // 1 second delay before erasing
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 150);
      } else {
        setTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, currentIndex, placeholders]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      const searchText = event.target.value;
      const babyNameSeach = await searchBabyMeaning(searchText);
      router.push(`${process.env.BASE_URL_PARENTING}/baby-names/results`);
    }
  };

  return (
    <div className="flex flex-col py-2 px-2 gap-[20px] font-medium	">
      <span className="text-[24px] sm:text-3xl text-bold">Baby Names</span>
      <div className=" text-left text-gray-600 text-sm">
        {babyNameSearch.searchDescription}
      </div>
      <div className="flex rounded-xl  overflow-hidden font-[sans-serif] focus-within:outline-none focus-within:ring-0 bg-[#E6F1EF]">
        <div className="w-8 sm:w-16 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="24px"
            className="fill-gray-600"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </div>
        <input
          type="text"
          id="first_name"
          className="bg-[#E6F1EF] border border-[#E6F1EF] text-gray-900 text-sm rounded-lg focus:ring-[#fff] focus:border-[#fff] block w-full p-2.5"
          placeholder={`Search meaning of ${displayText}`}
          required
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="relative w-full flex justify-center py-2">
        <div className="flex sm:w-80 sm:h-80 w-40 h-40 justify-center">
          <Image
            src="/images/babyNameSeach.svg"
            alt="topic-name"
            className="object-cover w-full h-full"
            width={340}
            height={306}
          />
        </div>
      </div>
    </div>
  );
}

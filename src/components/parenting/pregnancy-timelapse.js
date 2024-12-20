"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

const getTrimester = (week) => {
  if (week <= 13) return "1st Trimester";
  if (week <= 26) return "2nd Trimester";
  return "3rd Trimester";
};

export default function WeekByWeek() {
  const [currentTrimester, setCurrentTrimester] = useState("1st Trimester");
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const totalScrollWidth = scrollRef.current.scrollWidth;
      const weekIndex = Math.round((scrollLeft / totalScrollWidth) * 40);

      const week = weeks[weekIndex] || 1;
      setCurrentTrimester(getTrimester(week));
    }
  };

  return (
    <>
      <div className=" w-full h-fit sm:w-full sm:h-fit">
        <Image
          src="/images/pregnancyBanner.png"
          alt="Aid and Heal Logo"
          width={1}
          height={1}
          layout="responsive"
        />
      </div>
      <div className="p-4 bg-secondary">
        {/* Trimester Heading */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Pregnancy Week by Week</h1>
          <p className="text-gray-500">
            Select your week below to track each stage of your pregnancy.
          </p>
        </div>

        {/* Trimester Tabs */}
        <div className="flex justify-start gap-6 text-lg font-semibold">
          <div
            className={`${
              currentTrimester === "1st Trimester"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-400"
            } cursor-pointer`}
          >
            1st Trimester
          </div>
          <div
            className={`${
              currentTrimester === "2nd Trimester"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-400"
            } cursor-pointer`}
          >
            2nd Trimester
          </div>
          <div
            className={`${
              currentTrimester === "3rd Trimester"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-400"
            } cursor-pointer`}
          >
            3rd Trimester
          </div>
        </div>

        {/* Scrollable Weeks */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex space-x-4 mt-6 overflow-x-scroll scrollbar-hide p-2"
        >
          {weeks.map((week) => (
            <Link
              href={`/week-by-week/week-${week}`}
              key={week}
              className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md text-lg font-semibold text-gray-600 cursor-pointer hover:bg-blue-100"
            >
              Week {week}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSurveyContext } from "@@/context/surveyContext";
import { BiCommentError } from "react-icons/bi";

export default function BabyNameFamous() {
  const { meaningData } = useSurveyContext();

  return meaningData ? (
    <div className="flex flex-col py-2 px-2 sm:px-6 sm:border sm:rounded-xl	sm:border-1">
      <span className="text-[24px] sm:text-3xl py-2">
        {meaningData?.name} Name Meaning
      </span>
      {/* <hr className="h-px sm:my-4 bg-gray-200 border-0 dark:bg-gray-700" /> */}
      <div className="relative w-full  flex justify-center py-2">
        <div className="flex sm:w-80 sm:h-80 w-40 h-40 justify-center">
          <Image
            src="/images/babyNameMeaning.svg"
            alt="topic-name"
            className=" w-full h-full"
            width={1}
            height={1}
          />
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4">
        {/* <p className="text-left text-sm text-[#5C5A5A]">
          Wondering what's the significance of this name, know their gender,
          origin, meaning and details.
        </p> */}
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="border bg-[#E6F1EF] p-2 rounded-xl text-center">
              <div className="text-xl">Gender</div>
              <div className="text-[#5C5A5A]">{meaningData?.gender}</div>
            </div>
            <div className="border bg-[#E6F1EF] p-2 text-center rounded-xl">
              <div className="text-xl">Origin</div>
              <div className="text-[#5C5A5A]">{meaningData?.origin}</div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-4 flex gap-4 flex-col">
            <div className="border bg-[#E6F1EF] p-4 rounded-xl text-start sm:text-center">
              <div className="text-xl">Meaning</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: meaningData?.meaning || "Default meaning content.",
                }}
              />
            </div>
            <div className="border bg-[#E6F1EF] p-4 rounded-xl text-start sm:text-center">
              <div className="text-xl">Intresting facts </div>
              <div className="text-[#5C5A5A]">{meaningData?.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center py-2 px-2 gap-4 sm:px-6 sm:border sm:rounded-xl	sm:border-1">
      <BiCommentError size={24} />
      <span className="text-[24px] sm:text-3xl py-2">
        Try with another name.
      </span>
    </div>
  );
}

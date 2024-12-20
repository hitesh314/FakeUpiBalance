"use client";
import { useState } from "react";
import Image from "next/image";
import { useSurveyContext } from "@@/context/surveyContext";
import { useRouter } from "next/navigation";

export default function BabyNamesA2Z() {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const { generateNameSuggestions } = useSurveyContext();
  const router = useRouter();

  const handleSelect = async (letter) => {
    setSelectedLetter(letter);
    // console.log(selectedGender, selectedLetter);
    const results = await generateNameSuggestions(
      selectedGender,
      letter,
      null,
      null,
      null
    );

    if (results) {
      const baseURL = process.env.BASE_URL_PARENTING;
      console.log("BASE URL: ", baseURL);
      router.push(`${baseURL}/baby-names/suggestions`);
    }
  };
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };
  return (
    <div className="flex flex-col px-2">
      {/* Title */}
      <span className="text-[24px] sm:text-3xl py-2">Baby Names A-Z</span>
      {/* <hr className="h-px sm:my-4 bg-gray-200 border-0 dark:bg-gray-700" /> */}
      <div className="relative w-full py-2 flex justify-center">
        <div className="flex sm:h-[360px] w-auto h-[300px] justify-center">
          <Image
            src="/images/babyNameA2Z.svg"
            alt="topic-name"
            className="object-cover w-full h-full"
            width={1}
            height={1}
          />
        </div>
      </div>
      {/* Search Bar */}
      <div className="flex flex-col gap-2 min-h-8 sm:min-h-10">
        <span className="hidden sm:flex text-2xl pt-2">Gender</span>
        <div className="flex justify-center gap-4 rounded-xl">
          <button
            type="button"
            className={`flex-1 py-3 rounded-xl font-medium ${
              selectedGender === "Male"
                ? "bg-[#0E8E72] text-white"
                : "border text-gray-700"
            }`}
            onClick={() => handleGenderSelect("Male")}
          >
            ♂ Male
          </button>
          <button
            type="button"
            className={`flex-1 py-3 rounded-xl font-medium ${
              selectedGender === "Female"
                ? "bg-[#0E8E72] text-white"
                : "border text-gray-700"
            }`}
            onClick={() => handleGenderSelect("Female")}
          >
            ♀ Female
          </button>
        </div>

        <div className="flex flex-wrap gap-2 px-2 w-full rounded-md justify-start">
          {[
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
          ].map((letter, index) => (
            <div
              key={index}
              onClick={() => handleSelect(letter)}
              className={`flex justify-center items-center w-[42px] h-[42px] sm:w-[56px] sm:h-[56px] rounded-xl text-lg font-bold cursor-pointer ${
                selectedLetter === letter
                  ? "bg-dark-green text-white" // Dark green background and white text
                  : "bg-[#E6F1EF] text-black"
              }`}
              style={{
                backgroundColor:
                  selectedLetter === letter ? "#0E8E72" : "#E6F1EF", // Inline style for dark green
                color: selectedLetter === letter ? "white" : "black",
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

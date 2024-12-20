"use client";
import { useRouter } from "next/navigation";
import { suggestionBoxConfig } from "@@/config/parenting";
import babyNamesOrigin from "@@/public/data/babyNamesOrigin.json";
import { useSurveyContext } from "@@/context/surveyContext";
import { useState } from "react";

export default function BabyNameSuggestor() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState(null);
  const { generateNameSuggestions } = useSurveyContext();
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const gender = selectedGender || null;
    const startsWith = formData.get("startsWith") || null;
    const endsWith = formData.get("endsWith") || null;
    const meaning = formData.get("meaning") || null;
    const origin = formData.get("origin") || null;

    try {
      const suggestions = await generateNameSuggestions(
        gender,
        startsWith,
        endsWith,
        meaning,
        origin
      );

      if (suggestions) {
        router.push(`${process.env.BASE_URL_PARENTING}/baby-names/suggestions`);
      }
    } catch (error) {
      console.error("Error generating suggestions:", error);
    }
  };

  return (
    <div
      className="flex flex-col py-2 px-6 border rounded-xl"
      style={{
        backgroundImage: `url(/images/babynamegeneratorbackground.png)`,
      }}
    >
      <span className="text-[24px] sm:text-3xl py-2">Baby Names Generator</span>
      {/* <hr className="h-px sm:my-4 bg-gray-200 border-0 dark:bg-gray-700" /> */}
      <p className="text-left text-gray-600 mt-2 font-[12px] sm:font-xl">
        {suggestionBoxConfig.boxDescription}
      </p>

      <form onSubmit={handleSubmit} className="mt-2 space-y-6">
        {/* Gender Selection */}
        <span className="hidden sm:flex text-2xl pt-2">Gender</span>
        <div className="flex justify-center gap-4 rounded-xl">
          <button
            type="button"
            className={`flex-1 py-3 rounded-xl font-medium ${
              selectedGender === "Male"
                ? "bg-[#0E8E72] text-white"
                : "border text-gray-700 bg-white"
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
                : "border text-gray-700 bg-white"
            }`}
            onClick={() => handleGenderSelect("Female")}
          >
            ♀ Female
          </button>
        </div>

        {/* Name Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:text-[20px]">
          <div>
            <label className="block text-gray-700 font-medium mb-2 ">
              Names Starting With
            </label>
            <select
              name="startsWith"
              className="w-full border-gray-300 rounded-xl p-3 text-gray-700"
            >
              <option value="">Any Letter</option>
              {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Names Ending With
            </label>
            <select
              name="endsWith"
              className="w-full border-gray-300 rounded-xl p-3 text-gray-700"
            >
              <option value="">Any Letter</option>
              {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  sm:text-[20px]">
          <div>
            <label className="block  font-medium mb-2 text-gray-700">
              Names Which Mean
            </label>
            <input
              type="text"
              name="meaning"
              placeholder="Any Meaning (Optional)"
              className="w-full border-gray-300 rounded-xl p-3"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Names Of Origin
            </label>
            <select
              name="origin"
              className="w-full border-gray-300 rounded-xl p-3 "
            >
              <option value="">Any Origin</option>
              {babyNamesOrigin.map((origin) => (
                <option key={origin._id} value={origin._id}>
                  {origin._id}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#0E8E72] text-white py-3 rounded-xl font-medium transition"
        >
          Generate
        </button>
      </form>
    </div>
  );
}

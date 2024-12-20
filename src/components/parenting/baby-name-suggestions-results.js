"use client";
import React, { useState } from "react";
import { useSurveyContext } from "@@/context/surveyContext";

const BabyNamesComponent = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const namesPerPage = 10;
  const { nameSuggestions } = useSurveyContext();
  const data = nameSuggestions;

  // State to track which name is expanded
  const [expandedNameId, setExpandedNameId] = useState(null);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / namesPerPage);

  // Get current page data
  const currentData = data.slice(
    (currentPage - 1) * namesPerPage,
    currentPage * namesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setExpandedNameId(null); // Collapse any expanded name when page changes
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setExpandedNameId(null); // Collapse any expanded name when page changes
    }
  };

  // Handler to toggle expansion
  const toggleExpand = (id) => {
    setExpandedNameId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="flex flex-col py-2 px-2 sm:px-6 sm:border sm:rounded-xl	sm:border-1">
      <span className="text-[24px] sm:text-3xl py-2">Check Suggestions</span>
      <div className="text-left text-sm font-medium text-gray-600 mb-4">
        Choose from a list of{" "}
        <span className="text-green-600">{data.length}</span> names based on
        your choices.
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-2 gap-4 p-2 sm:p-4 rounded-md">
        {currentData.map((item) => (
          <div
            key={item._id}
            className={`bg-[#E6F1EF] rounded-xl shadow-md p-4 flex flex-col space-y-4 transition-all duration-300 ${
              expandedNameId === item._id ? "col-span-2" : ""
            }`}
          >
            {/* Name */}
            <div
              className="font-semibold text-lg cursor-pointer text-black hover:text-green-900"
              onClick={() => toggleExpand(item._id)}
            >
              {item.name}
            </div>

            {/* Expanded Details */}
            {expandedNameId === item._id && (
              <div className="mt-2 text-sm text-gray-700">
                {/* Replace the following with actual details */}
                <p>
                  <strong>Gender:</strong> {item.babyname.gender}
                </p>
                <p>
                  <strong>Origin:</strong> {item.babyname.origin}
                </p>
                <p>
                  <strong>Meaning:</strong> {item.babyname.meaning}
                </p>
                {/* Add more details as needed */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={` font-bold hover:underline ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &larr;
        </button>
        <span className="text-sm font-medium">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={` font-bold hover:underline${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default BabyNamesComponent;

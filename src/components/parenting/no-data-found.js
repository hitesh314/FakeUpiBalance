import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-sm">
        <div className="mb-4">
          <img
            src="/images/noimageFound.svg"
            alt="Not Found Icon"
            className="w-16 h-16 mx-auto"
          />
        </div>
        <h1 className="text-lg font-medium text-gray-800 mb-2">
          Sorry we couldn't find any matches
        </h1>
        <p className="text-gray-500">Please try searching with another term</p>
      </div>
    </div>
  );
};

export default NotFoundPage;

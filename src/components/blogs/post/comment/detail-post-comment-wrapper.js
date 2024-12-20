import React from "react";

const DetailPostCommentWrapper = ({ children }) => {
  return (
    <div
      id="comments"
      className="mx-auto my-5 max-w-4xl rounded-md bg-gray-50 px-7 py-5 shadow-sm ring-1 ring-black/5"
    >
      <div>{children}</div>
    </div>
  );
};

export default DetailPostCommentWrapper;

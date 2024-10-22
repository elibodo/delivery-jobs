import React from "react";

const JobLoading = ({ count = 10 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex h-[155.2px] w-[345px] animate-pulse rounded-lg bg-gray-100 shadow-lg md:h-[99.2px] md:w-[750px]"
        ></div>
      ))}
    </>
  );
};

export default JobLoading;

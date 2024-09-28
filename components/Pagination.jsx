import React from "react";

const Pagination = ({ postPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postPerPage);

  // Generate all page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Calculate the range of pages to display
  const maxPageLinks = 5;
  const halfMax = Math.floor(maxPageLinks / 2);
  let startPage = Math.max(1, currentPage - halfMax);
  let endPage = Math.min(totalPages, currentPage + halfMax);

  // Adjust the range if we are near the start or end of the total pages
  if (currentPage <= halfMax) {
    endPage = Math.min(maxPageLinks, totalPages);
  }
  if (currentPage + halfMax >= totalPages) {
    startPage = Math.max(1, totalPages - maxPageLinks + 1);
  }

  return (
    <nav>
      <ul className="flex flex-row gap-3">
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number}>
            <button
              onClick={() => {
                paginate(number);
              }}
              className={`${
                currentPage === number
                  ? "active: text-md flex cursor-pointer items-center justify-center rounded-lg border-2 border-orange-600 bg-orange-600 p-2 text-center font-normal text-white transition-all"
                  : "text-md flex cursor-pointer items-center justify-center rounded-lg border-2 border-black bg-transparent p-2 text-center font-normal text-black transition-all hover:border-orange-600 hover:bg-orange-600 hover:text-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);
  const router = useRouter();

  const handlePageClick = (number) => {
    setActivePage(number);
    paginate(number);
  };

  return (
    <div>
      <nav>
        <ul className="flex flex-row gap-3">
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                className={
                  activePage === number
                    ? "active: text-md flex cursor-pointer items-center justify-center rounded-lg border-2 border-orange-600 bg-orange-600 p-2 text-center font-normal text-white transition-all"
                    : "text-md flex cursor-pointer items-center justify-center rounded-lg border-2 border-black bg-transparent p-2 text-center font-normal text-black transition-all hover:border-orange-600 hover:bg-orange-600 hover:text-white"
                }
                onClick={() => {
                  router.push(`/?page=${number}&per_page=${postPerPage}`);
                  handlePageClick(number);
                  paginate(number);
                }}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

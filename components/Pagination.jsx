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
        <ul className="gap-3 flex flex-row">
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                className={
                  activePage === number
                    ? "active: rounded-lg border border-orange-600 bg-orange-600 p-2 text-white transition-all hover:border-black hover:bg-white hover:text-black text-center text-sm font-normal flex items-center justify-center"
                    : "rounded-lg border border-black bg-transparent p-2 text-black transition-all hover:bg-orange-600 hover:border-orange-600 hover:text-white text-center text-sm font-normal flex items-center justify-center"
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

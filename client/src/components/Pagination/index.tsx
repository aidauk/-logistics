"use client";
// import React from 'react'

// const Pagination = () => {
//   return (
//     <div className='bg-backgr rounded-10 px-[30px] py-[8px]'>
//         <div></div>
//         <p className='text-primary text-sm'>Показаны 1–25</p>
//     </div>
//   )
// }

// export default Pagination

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomImage from "../CustomImage";
import { down_arrow_black } from "@/imports";
import { ProductFilters } from "@/api/products";

const Pagination = ({
  totalPages,
  updateFilters,
  productsLength,
  pageSize,
}: {
  totalPages: number;
  updateFilters: (filters: ProductFilters) => void;
  productsLength: number;
  pageSize: number;
}) => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("pageId") || "1", 10);
  const pageNumbers = [];
  const fromShowed = (currentPage - 1) * pageSize + 1;
  const tillShowed = pageSize * (currentPage - 1) + productsLength;

  const setPage = (page: number) => {
    updateFilters({ pageId: page.toString() });
  };

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  return (
    <div className="flex items-center justify-between bg-backgr rounded-10 px-[30px] py-[8px]">
      <div className="flex items-center">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-[10px] px-[12px] py-[6px] disabled:opacity-50 bg-white border border-border rounded-250"
        >
          <CustomImage
            image={down_arrow_black}
            alt="down-icon"
            style="rotate-[90deg] max-w-[14px]"
          />
        </button>
        {pageNumbers.map((number, index) =>
          typeof number === "string" ? (
            <span
              key={index}
              className="py-[4px] px-[14px] text-sm mr-[10px] border border-paginationBorder rounded-250"
            >
              {number}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => setPage(number)}
              className={`py-[4px] px-[14px] text-sm border border-paginationBorder rounded-250 mr-[10px] ${
                currentPage === number
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          )
        )}
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mr-[10px] px-[12px] py-[6px] disabled:opacity-50 bg-white border border-border rounded-250"
        >
          <CustomImage
            image={down_arrow_black}
            alt="down-icon"
            style="rotate-[270deg] max-w-[14px]"
          />
        </button>
      </div>
      <p className="text-primary text-sm">
        {fromShowed == tillShowed
          ? `Показан - ${tillShowed}`
          : `Показаны ${fromShowed} - ${tillShowed}`}
      </p>
    </div>
  );
};

export default Pagination;

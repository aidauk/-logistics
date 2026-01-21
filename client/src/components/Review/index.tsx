"use client";
import { ReviewInterface } from "@/interfaces";
import Rating from "../Rating";
import { useState } from "react";

const Review = ({
  review,
  index,
}: {
  review: ReviewInterface;
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = review.comment;
  const maxLength = 280;
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded
    ? text
    : text.slice(0, maxLength) + (text.length > maxLength ? "..." : "");

  return (
    <div
      key={index}
      className={
        `flex-1 border border-border h-full ${
          !isExpanded && "max-h-[219px]"
        } rounded-20 p-20 ` + (index !== 0 && "review_none")
      }
    >
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="tex-base text-additional font-semibold">
          {review.name}
        </h3>
        <Rating view={true} productRating={review.rating} />
      </div>
      {/* <p className="text-xs text-primary">user address</p> */}
      <div className="overflow-hidden max-h-[120px]">
        <p className="text-text text-13 leading-5">{displayText}</p>
      </div>
      <button
        onClick={toggleExpansion}
        className={
          "px-14 py-[6px] bg-backgr text-xs mt-3 rounded-20 " +
          (text.length <= 280 && "hidden")
        }
      >
        {isExpanded ? "Краткий" : "Подробнее"}
      </button>
    </div>
  );
};

export default Review;

"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface props {
  view: boolean;
  productRating?: number;
  setRating?: any;
  rating?: number;
}

const Rating: React.FC<props> = (props: props) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-[5px]">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            {props.view ? (
              ""
            ) : (
              <input
                className="hidden"
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => props.setRating(currentRating)}
              />
            )}
            <FaStar
              size={18}
              className={"star " + (!props.view && 'cursor-pointer')}
              color={
                currentRating <= (hover || (props.view ? (props.productRating ?? 0) : (props.rating ?? 0)))
                  ? "#F77219"
                  : "#e4e5e9"
              }
              onMouseEnter={() => !props.view && setHover(currentRating)}
              onMouseLeave={() => !props.view && setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;

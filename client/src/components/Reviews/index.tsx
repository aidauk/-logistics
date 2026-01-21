"use client";
import { selectModal } from "@/redux/features/modal-window/modal-window.slice";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import { useSelector } from "react-redux";
import Review from "../Review";
import { selectProduct } from "@/redux/features/products/slices/product.slice";
import Rating from "../Rating";
import { ReviewInterface } from "@/interfaces";

const Reviews = () => {
  const { active, type } = useSelector(selectModal);
  const { data } = useSelector(selectProduct);
  const { reviews } = data;

  return (
    <div
      className={
        "p-[20px] absolute bg-white max-h-screen min-h-screen w-[500px] right-0 z-20 flex flex-col gap-[25px] overflow-y-scroll "
      }
    >
      {reviews.map((review, index) => {
        return (
          <div
            key={index}
            className={
              `border border-border border-x-0 border-t-0 pb-[20px] ` +
              (index !== 0 && "review_none")
            }
          >
            <div className="mb-[20px]">
              <div className="flex justify-between items-center">
                <h3 className="tex-base text-additional font-semibold">
                  {review.name}
                </h3>
                <Rating view={true} productRating={review.rating} />
              </div>
              <p className="text-xs text-primary">{review.createdAt.toString()}</p>
            </div>
            <p className="text-text text-13 leading-5">{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;

import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import InsideWidthWrapper from "../InsideWrapper";
import SwiperCarousel from "../SwiperCarousel";
import Image from "next/image";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
} from "@/redux/features/modal-window/modal-window.slice";
import { selectProduct } from "@/redux/features/products/slices/product.slice";


const Carousel = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector(selectProduct);

  return (
    <MaxWidthWrapper className="modal-swiper-container relative py-0 z-10">
      <div
        onClick={() => dispatch(closeModal())}
        className="absolute w-full h-full z-0"
      ></div>
      <InsideWidthWrapper className="max-w-4xl modal-swiper-wrapper px-20 py-0 z-10">
        <SwiperCarousel
          breakpoints={[1, 1, 1, 1]}
          navigation={true}
          zoom={true}
          pagination={true}
          slidesPerView={1}
          data={data.images?.map((image, index) => {
            return (
              <div key={index} className="">
                <Image
                  width={10000}
                  height={10000}
                  src={image.uri}
                  alt={`swiper image ${index}`}
                  className=""
                />
              </div>
            );
          })}
        />
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default Carousel;

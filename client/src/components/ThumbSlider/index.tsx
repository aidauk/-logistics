"use client";

import Image from "next/image";
import { openModal } from "@/redux/features/modal-window/modal-window.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ImageInterface } from "@/interfaces";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import defaultProductImage from "../../../public/images/default-featured-image.jpg";

const ThumbCarousel = ({
  images,
  type,
}: {
  images: ImageInterface[];
  type: number;
}) => {
  const dispatch: AppDispatch = useDispatch();
  
  
  if (type == 1) {
    console.log(1)
    return (
      <>
        <div id="caruosel" className="w-full flex">
          <div
            onClick={() => dispatch(openModal({type: ModalWindowTypes.CAROUSEL}))}
            className="w-full rounded-20 cursor-pointer"
          >
            <Image
              width={1000}
              height={1000}
              alt="Slider main image"
              src={images[0] ? images[0].uri : defaultProductImage}
              className="w-full max-h-[427px] object-cover rounded-20"
            />
          </div>
          <div className="max-w-197 w-full flex flex-col gap-2 justify-between ml-5 imgs_box">
            <div
              onClick={() => dispatch(openModal({type: ModalWindowTypes.CAROUSEL}))}
              className="w-full md:h-full cursor-pointer"
            >
              <Image
                alt="Slider main image"
                width={1000}
                height={1000}
                src={images[1] ? images[1].uri : defaultProductImage}
                className="w-full h-full rounded-10 object-cover"
              />
            </div>
            <div
              onClick={() => dispatch(openModal({type: ModalWindowTypes.CAROUSEL}))}
              className="w-full md:h-full max-h-132 cursor-pointer"
            >
              <Image
                alt="Slider main image"
                width={1000}
                height={1000}
                src={images[2] ? images[2].uri : defaultProductImage}
                className="w-full h-full rounded-10 object-cover"
              />
            </div>
            <div
              className="relative w-full md:h-full max-h-132 cursor-pointer flex justify-center items-center"
              onClick={() => dispatch(openModal({type: ModalWindowTypes.CAROUSEL}))}
            >
              <div
                className={`absolute w-full h-full rounded-10 bg-primary z-0 opacity-60 ${
                  images.length < 5 ? "hidden" : "block"
                }`}
              ></div>
              <p
                className={`absolute text-white text-xs font-semibold z-10 ${
                  images.length < 5 ? "hidden" : "block"
                }`}
              >
                ещё {images.length - 4}+
              </p>
              <Image
                alt="Slider main image"
                width={1000}
                height={1000}
                src={images[3] ? images[3].uri : defaultProductImage}
                className="w-full h-full rounded-10 object-cover"
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div id="caruosel2" className="w-full min-h-268 flex">
        <div onClick={() => dispatch(openModal({type: ModalWindowTypes.CAROUSEL}))} className="w-full">
          <Image
            width={1000}
            height={1000}
            alt="Slider main image"
            src={images[0] ? images[0].uri : defaultProductImage}
            className="w-full h-full rounded-10 cursor-pointer object-cover"
          />
        </div>
        <div className="max-w-80 w-full flex flex-col gap-4 justify-between ml-4 booking_imgBox">
          <div onClick={() => dispatch(openModal({type: ModalWindowTypes.CAROUSEL}))} className="h-full">
            <Image
              width={1000}
              height={1000}
              alt="Slider main image"
              src={images[0] ? images[0].uri : defaultProductImage}
              className="w-full h-full object-cover cursor-pointer rounded-10"
            />
          </div>
          <div onClick={() => dispatch(openModal({type: ModalWindowTypes.CAROUSEL}))} className="h-full">
            <Image
              width={1000}
              height={1000}
              alt="Slider main image"
              src={images[0] ? images[0].uri : defaultProductImage}
              className="w-full h-full object-cover cursor-pointer rounded-10"
            />
          </div>
          <div
            className="relative h-full cursor-pointer flex justify-center items-center"
            onClick={() => dispatch(openModal({type: ModalWindowTypes.CAROUSEL}))}
          >
            <div
              className={`absolute w-full h-full rounded-10 bg-primary z-0 opacity-60 ${
                images.length < 5 ? "hidden" : "block"
              }`}
            ></div>
            <p
              className={`absolute text-white text-xs font-semibold z-10 ${
                images.length < 5 ? "hidden" : "block"
              }`}
            >
              ещё {images.length - 4}+
            </p>
            <Image
              width={1000}
              height={1000}
              alt="Slider main image"
              src={images[0] ? images[0].uri : defaultProductImage}
              className="w-full h-full object-cover rounded-10"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ThumbCarousel;

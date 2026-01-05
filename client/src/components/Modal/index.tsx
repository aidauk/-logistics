"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InsideWidthWrapper from "../InsideWrapper";
import SwiperCarousel from "../SwiperCarousel";
import Image, { StaticImageData } from "next/image";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  closeModal,
  openModal,
  selectModal,
} from "@/redux/features/modal-window/modal-window.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import Login from "@/components/Login";
import Booking from "@/components/Booking";
import Carousel from "@/components/Carousel";
import Register from "../Register";
import { fetchUserFailure } from "@/redux/features/users/slices/user.slice";
import Reviews from "../Reviews";
import MakeSure from "../MakeSure/index.";

const Modal = ({ images }: { images?: Array<StaticImageData> }) => {
  const dispatch: AppDispatch = useDispatch();
  const { active, type } = useSelector(selectModal);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [active]);

  function modalContent() {
    switch (type) {
      case ModalWindowTypes.REVIEWS:
        return <Reviews />;
      case ModalWindowTypes.MAKESURE:
        return <MakeSure />;
      case ModalWindowTypes.CAROUSEL:
        return <Carousel />;
      case ModalWindowTypes.LOGIN:
        return <Login />;
      case ModalWindowTypes.BOOKING:
        return <Booking />;
      case ModalWindowTypes.REGISTER:
        return <Register />;
    }
  }

  return (
    <div
      className={
        "w-full fixed min-h-screen flex justify-center items-center duration-200 ease-in-out top-0 right-0 overflow-hidden " +
        (active ? "opacity-1 z-40" : "opacity-0 -z-10")
      }
    >
      <div
        onClick={() => {
          dispatch(closeModal());
          dispatch(fetchUserFailure(null));
        }}
        className="fixed bg-modal_color w-full h-full z-10"
      ></div>
      {modalContent()}
    </div>
  );
};

export default Modal;

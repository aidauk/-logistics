"use client";

import { fetchMyProducts, fetchProducts } from "@/api/products";
import PrfofileLinks from "@/components/ProfileLinks";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SwiperCarousel from "@/components/SwiperCarousel";
import { defaultProductImage } from "@/imports";
import { ProductInterface } from "@/interfaces";
import { selectProducts } from "@/redux/features/products/slices/products.slice";
import { statusTypes } from "@/redux/status-types";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";
import { openModal } from "@/redux/features/modal-window/modal-window.slice";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import Loading from "@/components/Loading";

const page = () => {
  // const [products, setProducts] = useState<ProductInterface[] | null>(null);
  const accessToken = useLocalStorage("", "accessToken");
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector(selectProducts);

  useEffect(() => {
    if (status === statusTypes.INIT) {
      dispatch(fetchMyProducts(accessToken));
    }
  }, [status, dispatch]);

  if (status === statusTypes.ERROR) {
    return <div>Error: {error}</div>;
  }

  console.log("🚀 ~ page ~ status:", status);
  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper
        id="inside_wrapper"
        className="flex gap-20 md:flex-row flex-col"
      >
        <PrfofileLinks />
        <aside className="cabinet_swiper">
          <h2
            id="leftsided_h2"
            className="text-32 text-additional font-semibold mb-5"
          >
            Мои объекты
          </h2>
          {status == statusTypes.LOADING || status == statusTypes.INIT ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="homepage-swiper-navigation backgr-pagination relative">
              <SwiperCarousel
                breakpoints={[2, 2, 2, 1]}
                navigation={true}
                pagination={true}
                slidesPerView={3}
                data={data.products?.map(
                  (
                    product: ProductInterface,
                    index: number
                  ): React.ReactNode => {
                    return (
                      <div key={index} className="lg:max-w-305 w-full">
                        <div className="w-full h-289 rounded-20 relative overflow-hidden swiper_imgBox cabinet_swiper_imgBox">
                          {product.state == "pending" ? (
                            <div className="absolute w-full h-full rounded-10 justify-center flex items-center">
                              <div className="w-full h-full rounded-10 bg-primary z-0 opacity-50"></div>
                              <p className="absolute text-white text-base z-1">
                                В ожидании...
                              </p>
                            </div>
                          ) : product.state == "activated" ? (
                            <div className="absolute py-[8px] px-[20px] bg-secondary text-white text-xs flex items-center justify-center rounded-[250px] top-[12px] right-[12px]">
                              Активирован
                            </div>
                          ) : (
                            <div className="absolute py-[8px] px-[20px] bg-[#DAA520] text-white text-xs flex items-center justify-center rounded-[250px] top-[12px] right-[12px]">
                              Деактивирован
                            </div>
                          )}
                          <Image
                            src={
                              product.images[0]
                                ? product.images[0].uri
                                : defaultProductImage
                            }
                            alt={"dacha image"}
                            width={1000}
                            height={1000}
                            className="w-full h-full rounded-20 object-cover"
                          />
                        </div>

                        <h3 className="font-semibold text-base mt-5 text-additional">
                          {product.name}
                        </h3>
                        <p className="text-orange text-xs mb-7">
                          {product.address.city}
                        </p>
                        <p className="text-text leading-6 text-sm">
                          {product.description}
                        </p>
                        <div className="w-full flex items-center">
                          <Link
                            href={`/edit-object/${product._id}`}
                            className="moreInfo_btn mt-20 py-10 px-22 text-center border border-primary text-white bg-primary rounded-250"
                          >
                            Изменить
                          </Link>
                          <button
                            onClick={() =>
                              dispatch(
                                openModal({
                                  product_id: product._id,
                                  type: ModalWindowTypes.MAKESURE,
                                })
                              )
                            }
                            className="moreInfo_btn mt-20 py-10 px-22 text-center border border-primary text-primary rounded-250"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}
              />
            </div>
          )}
        </aside>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default page;

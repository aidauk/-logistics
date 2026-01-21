"use client";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Search from "@/components/SearchBar";
import Image from "next/image";
import FlexWrap from "@/components/FlexWrap";
import contactImage from "../../public/images/contactImage.jpg";
import defaultProductImage from "../../public/images/default-featured-image.jpg";
import SwiperCarousel from "@/components/SwiperCarousel";
import { importInfos } from "@/lib/data";
import {
  CategoryInterface,
  ProductInterface,
  SearchParams,
} from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectProducts } from "@/redux/features/products/slices/products.slice";
import { fetchProducts } from "@/api/products";
import { useEffect, useState } from "react";
import { statusTypes } from "@/redux/status-types";
import Link from "next/link";
import { useReset } from "@/hooks/useReset";
import { openModal } from "@/redux/features/modal-window/modal-window.slice";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import { fetchCategories } from "@/api/categories";
import { selectProduct } from "@/redux/features/products/slices/product.slice";
import { category1, category2, category3, mainBgImgae } from "@/imports";
import Loading from "@/components/Loading";
import { createApplicaiton } from "@/api/applications";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryState {
  data: CategoryInterface[];
  status: statusTypes;
}
function Home() {
  const [categories, setCategories] = useState<CategoryState>({
    data: [],
    status: statusTypes.INIT,
  });
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector(selectProducts);
  useReset();

  // ----------------------------------------------------------------

  useEffect(() => {
    if (status === statusTypes.INIT) {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Use useEffect to fetch categories when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setCategories({
        data: [],
        status: statusTypes.LOADING,
      });
      try {
        const fetchedCategories = await fetchCategories();
        setCategories({
          data: fetchedCategories,
          status: statusTypes.SUCCESS,
        });
      } catch (err: any) {
        console.error("Error fetching categories:", err.message);
        setCategories({
          data: [],
          status: statusTypes.ERROR,
        });
      }
    };

    fetchData();
  }, []);
  console.log("🚀 ~ Home ~ data:", data);

  return (
    <main className="">
      <MaxWidthWrapper className="relative flex justify-center">
        <Image
          className="w-full absolute object-cover h-full"
          // src={`${"http://localhost:8063/main-image/main.jpg"}?timestamp=${new Date().getTime()}`}
          src={mainBgImgae}
          fill
          alt="main home background image"
        />
        <InsideWidthWrapper
          id="inside_wrapper"
          className="flex flex-col xs:gap-[96px] gap-[50px] text-center xs:text-left"
        >
          <aside className="relative">
            <h1
              id="homePage_title"
              className="font-bold text-[46px] leading-[56px] text-white first-letter"
            >
              Найдите жилье для отдыха <br></br> и проживания с комфортом
            </h1>
            <h3
              id="homePage_subtitle"
              className="font-normal text-3xl text-white xs:mt-[8px] mt-[20px]"
            >
              Ищите спецпредложения на дома и квартиры
            </h3>
          </aside>
          <Search />
        </InsideWidthWrapper>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex justify-center bg-white">
        <InsideWidthWrapper className="w-full" id="inside_wrapper">
          <h2
            id="standart_h2"
            className="mb-[32px] text-[32px] text-center xs:text-left font-semibold text-additional"
          >
            Новые объявления
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
                data={data.products.map(
                  (
                    product: ProductInterface,
                    index: number
                  ): React.ReactNode => {
                    return (
                      <div
                        key={index}
                        className="lg:max-w-[413px] w-full text-left"
                      >
                        <div className="h-[190px] xs:h-[220px] md:h-[289px] w-full rounded-[20px]">
                          <Image
                            src={
                              product.images[0]
                                ? product.images[0].uri
                                : defaultProductImage
                            }
                            width={1000}
                            height={1000}
                            alt={"product image"}
                            className="w-full h-full object-cover rounded-[20px]"
                          />
                          <span className="absolute py-[8px] px-[20px] bg-secondary text-white text-xs flex items-center justify-center rounded-[250px] top-[12px] right-[12px]">
                            {product.address.city}
                          </span>
                        </div>

                        <h3 className="my-[15px] font-semibold text-lg leading-[21.94px] xs:my-[20px] text-additional">
                          {product.name}
                        </h3>
                        <p className="text-text text-sm font-nomral leading-[24px]">
                          {product.description}
                        </p>

                        <div className="flex mt-[36px] gap-[15px] xl:gap-[2px] flex-col xl:flex-row">
                          <button
                            onClick={() =>
                              dispatch(
                                openModal({ type: ModalWindowTypes.BOOKING })
                              )
                            }
                            className="hover:bg-secondary transition-all w-full xl:w-auto py-[15px] px-[43px] text-center border border-primary bg-primary text-white rounded-[250px]"
                          >
                            Забронировать
                          </button>
                          <Link
                            href={`/products/${product._id}`}
                            className="hover:bg-primary hover:text-white transition-all w-full xl:w-auto py-[15px] px-[23px] text-center border border-primary text-primary rounded-[250px]"
                          >
                            Подробнее
                          </Link>
                        </div>
                      </div>
                    );
                  }
                )}
              />
            </div>
          )}
        </InsideWidthWrapper>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex justify-center bg-backgr">
        <InsideWidthWrapper id="inside_wrapper">
          <h2
            id="standart_h2"
            className="text-[32px] mb-[32px] font-semibold text-additional"
          >
            Поиск по типу размещения
          </h2>
          {categories.status == statusTypes.LOADING ||
          categories.status == statusTypes.INIT ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="white-pagination relative">
              <SwiperCarousel
                breakpoints={[2, 2, 1, 1]}
                navigation={false}
                pagination={true}
                slidesPerView={3}
                data={categories.data.map(
                  (
                    category: CategoryInterface,
                    index: number
                  ): React.ReactNode => {
                    return (
                      <div
                        key={index}
                        className="lg:max-w-[413px] bg-white rounded-[20px]"
                      >
                        <div className="h-[237px] overflow-hidden swiper_imgBox2">
                          <Image
                            src={
                              index == 0
                                ? category1
                                : index == 1
                                ? category3
                                : category2
                            }
                            alt={"dacha image"}
                            className="w-full h-full rounded-t-[20px] object-cover"
                          />
                        </div>
                        <aside className="flex items-center justify-between px-[24px] gap-[8px]">
                          <div className="my-[20px]">
                            <h3 className="font-semibold text-base text-additional">
                              {category.name}
                            </h3>
                            <p className="text-text text-xs font-normal">
                              {
                                data.products.filter((item) => {
                                  return item.category == category._id;
                                }).length
                              }
                              {" шт."}
                            </p>
                          </div>
                          <a
                            href={`/products?category=${category._id}`}
                            className="py-[10px] px-[22px] text-sm text-center border border-primary text-primary rounded-[250px]"
                          >
                            Перейти
                          </a> 
                        </aside>
                      </div>
                    );
                  }
                )}
              />
            </div>
          )}
        </InsideWidthWrapper>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex justify-center bg-white">
        <InsideWidthWrapper id="inside_wrapper">
          <h2
            id="standart_h2"
            className="mb-[32px] text-[32px] font-semibold text-additional"
          >
            Выбор наших гостей
          </h2>
          {status == statusTypes.LOADING || status == statusTypes.INIT ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div className="homepage-swiper-navigation backgr-pagination relative">
              <SwiperCarousel
                breakpoints={[3, 2, 2, 1]}
                navigation={true}
                pagination={true}
                slidesPerView={4}
                data={data.products.map(
                  (
                    product: ProductInterface,
                    index: number
                  ): React.ReactNode => {
                    return (
                      <div key={index} className="lg:max-w-[305px] w-full">
                        <div className="w-full h-[289px] rounded-[20px] overflow-hidden swiper_imgBox">
                          <Image
                            src={
                              product.images[0]
                                ? product.images[0].uri
                                : defaultProductImage
                            }
                            width={1000}
                            height={1000}
                            alt={"dacha image"}
                            className="w-full h-full rounded-[20px] object-cover"
                          />
                        </div>

                        <h3 className="font-semibold text-base mt-[20px] text-additional">
                          {product.name}
                        </h3>
                        <p className="text-orange text-xs mb-[28px]">
                          {product.address.city}, {product.address.district}
                        </p>
                        <p className="text-text leading-[24px] text-sm">
                          {product.description}
                        </p>
                        <p className="text-primary my-[20px]">
                          {product.price.amount}{" "}
                          {product.price.currency === "uzs" ? "сум" : "rub"}/{" "}
                          {product.operation_type == "daily_rent"
                            ? "1 kecha"
                            : product.operation_type == "monthly_rent"
                            ? "1 oy"
                            : ""}
                        </p>

                        <button className="py-[15px] px-[43px] xs:w-auto w-full text-center border border-primary bg-primary text-white rounded-[250px]">
                          Забронировать
                        </button>
                      </div>
                    );
                  }
                )}
              />
            </div>
          )}
        </InsideWidthWrapper>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex justify-center bg-backgr">
        <InsideWidthWrapper id="inside_wrapper">
          <h2
            id="standart_h2"
            className="text-[32px] mb-[32px] font-semibold text-additional"
          >
            Почему Dachilla?
          </h2>

          <FlexWrap
            className="lg:flex-row md:flex-col flex-nowrap justify-start gap-[20px]"
            id="info_container"
          >
            {importInfos(0, 1)}
            {importInfos(2, 3)}
          </FlexWrap>
        </InsideWidthWrapper>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="bg-white flex justify-center">
        <InsideWidthWrapper
          id="inside_wrapper"
          className="lg:py-[80px] md:py-[80px]"
        >
          <div
            id="form_container"
            className="bg-backgr min-h-[383px] flex rounded-[20px]"
          >
            <div
              id="form_img_box"
              className="lg:max-w-[554px] md:max-w-[554px] w-full "
            >
              <Image
                id="form_img"
                src={contactImage}
                alt={"contact image"}
                className="w-full h-full object-cover lg:rounded-l-[20px] md:rounded-l-[20px]"
              />
            </div>
            <aside
              id="form_box"
              className="w-full flex justify-center items-center lg:mx-[40px] md:mx-[40px]"
            >
              <form
                action={async (formData: FormData) => {
                  const response = await createApplicaiton(formData);
                  if (response.status == 201) {
                    alert("Заявка успешно отправлена!");
                    window.location.reload();
                  } else {
                    alert("Ошибка при отправке заявки!");
                  }
                }}
                className="lg:max-w-[540px] md:max-w-[540px] w-full"
              >
                <h2
                  id="form_h2"
                  className="text-[25px] font-semibold text-additional"
                >
                  Оставьте заявку и мы найдём вам место для отдыха в этот же
                  день!
                </h2>
                <p
                  id="form_p"
                  className="text-lg text-text mt-[12px] mb-[20px]"
                >
                  Специалист свяжется с вами как только получит заявку
                </p>
                <div
                  id="form_input_box"
                  className="flex justify-between md:gap-[8px]"
                >
                  <input
                    name="name"
                    type="text"
                    placeholder="Ваше имя"
                    className="lg:max-w-[260px] w-full text-additional text-xs bg-backgr py-[16px] px-[20px] rounded-[250px] border border-additional_border outline-none"
                  />
                  <input
                    name="phone"
                    type="text"
                    placeholder="Ваш телефон"
                    className="lg:max-w-[260px] w-full text-additional text-xs bg-backgr py-[16px] px-[20px] rounded-[250px] border border-additional_border outline-none"
                  />
                </div>
                <button
                  id="form_btn"
                  type="submit"
                  className="w-full mt-[20px] cursor-pointer bg-primary text-white py-[12px] rounded-[250px]"
                >
                  Отправить запрос
                </button>
              </form>
            </aside>
          </div>
        </InsideWidthWrapper>
      </MaxWidthWrapper>
    </main>
  );
}

export default Home;

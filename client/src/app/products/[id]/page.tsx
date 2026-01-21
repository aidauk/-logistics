"use client";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { defaultProductImage, favourite, share } from "@/imports";
import SwiperCarousel from "@/components/SwiperCarousel";
import ThumbCarousel from "@/components/ThumbSlider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { CategoryInterface, ProductInterface } from "@/interfaces";
import { addReview, fetchProduct } from "@/api/products";
import { selectProduct } from "@/redux/features/products/slices/product.slice";
import { statusTypes } from "@/redux/status-types";
import { selectProducts } from "@/redux/features/products/slices/products.slice";
import Rating from "@/components/Rating";
import Review from "@/components/Review";
import { openModal } from "@/redux/features/modal-window/modal-window.slice";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import CustomImage from "@/components/CustomImage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchCategories } from "@/api/categories";
import Link from "next/link";
import { fetchOrder } from "@/api/orders";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { selectUser } from "@/redux/features/users/slices/user.slice";
import Loading from "@/components/Loading";
import { addFavorites } from "@/api/users";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  const productsData = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const router = useRouter()
  const [color, setColor] = useState("#404E5A");
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector(selectProduct);
  const accessToken = useLocalStorage("", "accessToken");
  const [_rating, setRating] = useState(0);

  useEffect(() => {
    if (params.id && status === statusTypes.INIT || status == null) {
      dispatch(fetchProduct(params.id as string));
    }
  }, [status, dispatch, params.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err: any) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    if (user.data.favorites?.includes(data._id)) {
      setColor("red");
    } else {
      setColor("#404E5A");
    }
  }, [user]);

  if (status == statusTypes.LOADING || status == statusTypes.INIT) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (status === statusTypes.ERROR) {
    return <div>Error: {error.message}</div>;
  }

  const foundCategory = categories.find((category) => {
    return category._id == data.category;
  });

  return (
    <main>
      <MaxWidthWrapper className="">
        <InsideWidthWrapper id="inside_wrapper" className="">
          <div id="con_1" className="w-full">
            <div className="w-full flex justify-between items-center">
              <h2
                id="leftsided_h2"
                className="text-32 text-additional font-semibold"
              >
                {data.name}
              </h2>
              <div className="lg:flex md:flex hidden gap-[16px] items-center">
                <p id="cost" className="text-secondary text-base font-semibold">
                  {data.price.amount} {data.price.currency}/{" "}
                  {data.operation_type === "daily_rent"
                    ? "За день"
                    : data.operation_type === "monthly_rent"
                    ? "За месяц"
                    : ""}
                </p>
                {/* <CustomImage image={favourite} alt="" style="max-w-[26px]"/> */}
                <button
                  onClick={() => dispatch(addFavorites(accessToken, data._id))}
                >
                  <FavoriteIcon
                    sx={{
                      color: color,
                      opacity: "40%",
                      cursor: "pointer",
                      fontSize: "34px",
                    }}
                  />
                </button>
                <CustomImage
                  image={share}
                  alt=""
                  style="max-w-[24px] cursor-pointer"
                />
              </div>
            </div>
            <div className="flex gap-[20px] items-center">
              <p className="text-xs text-text font-normal">
                {data.address.city}, {data.address.district},{" "}
                {data.address.street}
              </p>
              <Rating
                setRating={() => {}}
                rating={NaN}
                view={true}
                productRating={data.rating}
              />
            </div>
            <div className="flex justify-between md:items-end md:w-auto md:gap-0 md:flex-row md:my-[0px] w-full gap-[20px] flex-col my-[30px]">
              <ul className="flex list-none gap-[10px] items-center product_ul">
                <li className="px-14 py-06 rounded-250 bg-backgr text-additional text-sm font-normal">
                  {foundCategory?.name}
                </li>
                <li className="px-14 py-06 rounded-250 bg-primary text-white text-sm font-normal">
                  Новинка
                </li>
              </ul>
              <div className="gap-5 hidden product_cost_share_like">
                <p id="cost" className="text-secondary text-base font-semibold">
                  {data.price.amount} {data.price.currency}/{" "}
                  {data.operation_type === "daily_rent"
                    ? "За день"
                    : data.operation_type === "monthly_rent"
                    ? "За месяц"
                    : ""}
                </p>
                <div className="flex items-center">
                  <div onClick={() => setColor("red")}>
                    <FavoriteIcon
                      sx={{
                        color: color,
                        opacity: "40%",
                        cursor: "pointer",
                        fontSize: "34px",
                      }}
                    />
                  </div>
                  <CustomImage
                    image={share}
                    alt=""
                    style="max-w-[24px] cursor-pointer"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(fetchOrder(accessToken, data._id))
                  router.push('/booking-page')
                }}
                id="booking_btn"
                className="py-15 px-43 text-center border border-primary bg-primary text-white rounded-250"
              >
                Забронировать
              </button>
            </div>
            <div className="mt-[30px] flex product_container_1">
              <aside className="w-full">
                <ThumbCarousel type={1} images={data.images} />
                <p className="leading-8 text-text text-20 mt-5">
                  {data.description}
                </p>
              </aside>
              <aside className="ml-7 max-w-305 w-full product_detail">
                <div id="map"></div>
                <div id="shadow_box" className="rounded-10 w-full">
                  <h3 className="pl-4 py-3 rounded-t-10 bg-additional  text-white text-sm font-medium">
                    Информация о бронировании
                  </h3>
                  <p className="px-4 py-3 text-text text-sm">
                    Для бронирования этой дачи позвоните по номеру:
                  </p>
                  <p className="px-4 pb-4 text-secondary text-sm font-bold">
                    {data.contact.phone}
                  </p>
                </div>
              </aside>
            </div>
          </div>
          <div id="2-con" className="mt-80 w-full">
            <h2
              id="standart_h2"
              className="text-32 text-additional font-semibold"
            >
              Удобства
            </h2>
            <div className="lg:grid grid-cols-4 hidden gap-[20px] w-full mt-[20px]">
              {data?.comforts?.special?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full p-[20px] text-additional text-base text-medium pl-4 py-7 bg-backgr rounded-20 flex items-center"
                  >
                    <CheckCircleIcon className="mr-3" />
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="hidden w-full product_slider">
              <div className="backgr-pagination relative">
                <SwiperCarousel
                  pagination={true}
                  navigation={false}
                  slidesPerView={4}
                  breakpoints={[3, 2, 1, 1]}
                  data={data.comforts.special?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full text-additional text-base text-medium mt-5 pl-4 py-7 bg-backgr rounded-20 flex items-center"
                      >
                        <CheckCircleIcon className="mr-3" />
                        {item}
                      </div>
                    );
                  })}
                />
              </div>
            </div>
          </div>
          <div id="con_3" className="mt-80">
            <div className="flex justify-between items-center review_box">
              <h2
                id="standart_h2"
                className="text-32 text-additional font-semibold"
              >
                Отзывы
              </h2>
              <button
                onClick={() =>
                  dispatch(openModal({ type: ModalWindowTypes.REVIEWS }))
                }
                className="px-22 py-10 text-sm border-primary border text-primary rounded-20"
              >
                Читать все отзывы
              </button>
            </div>
            <div className="mt-8 flex gap-7">
              {data.reviews.map((review, index) => (
                <Review review={review} index={index} />
              ))}
            </div>

            <div className="w-full bg-backgr mt-6 p-20 rounded-20">
              <h3 className="tex-base text-additional font-semibold mb-4">
                Оставьте свой отзыв
              </h3>
              <form
                action={(formData) => {
                  dispatch(addReview(accessToken, data._id, formData, _rating));
                }}
                className="w-full flex flex-col"
              >
                <div className="flex gap-7 product_form_box1 items-center">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    className="border border-additional_border px-20 py-17 text-additional rounded-250 outline-none text-xs bg-backgr max-w-378 w-full"
                  />
                  <input
                    name="city"
                    type="text"
                    placeholder="Город"
                    className="border border-additional_border px-20 py-17 text-additional rounded-250 outline-none text-xs bg-backgr max-w-378 w-full"
                  />
                  <Rating
                    productRating={0}
                    view={false}
                    setRating={setRating}
                    rating={_rating}
                  />
                </div>
                <textarea
                  name="comment"
                  className="text-xs text-additional w-full border border-additional_border bg-backgr px-20 py-17 outline-none min-h-114 h-full mt-15 rounded-20"
                  placeholder="Текст сообщения"
                />
                <div className="flex items-center mt-7 gap-12 product_form_box2">
                  <button
                    type="submit"
                    id="booking_btn"
                    className="text-base py-15 px-43 text-center border border-primary bg-primary text-white rounded-250"
                  >
                    Отправить
                  </button>
                  <p className="text-base text-text">
                    Ваш отзыв будет добавлен после модерации администратора
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div id="con_4" className="mt-80">
            <h2
              id="standart_h2"
              className="mb-8 text-32 text-additional font-semibold"
            >
              Наличие мест
            </h2>
            <form className="border border-border flex rounded-20 gap-20 p-9 items-center product_form2">
              <div className="product_inputBox1 flex w-full gap-20">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="border border-border px-20 py-17 text-additional rounded-250 outline-none text-xs max-w-378 w-full"
                />
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Колличество гостей"
                  className="border border-border px-20 py-17 text-additional rounded-250 outline-none text-xs max-w-220 w-full"
                />
              </div>
              <div className="product_inputBox1 flex gap-20">
                <input
                  type="date"
                  name=""
                  id=""
                  className="px-20 w-full py-17 border border-border rounded-250 outline-none text-additional text-xs"
                />
                <input
                  type="date"
                  name=""
                  id=""
                  className="px-20 w-full py-17 border border-border rounded-250 outline-none text-additional text-xs"
                />
              </div>

              <button
                id="booking_btn"
                className="py-15 px-43 text-center border border-primary bg-primary text-white rounded-250"
              >
                <a href="/pay-page">Забронировать</a>
              </button>
            </form>
            <div className="mt-8 p-7 rounded-20 bg-backgr">
              <h3 className="tex-base text-additional font-semibold">
                * Примечания
              </h3>
              <p className="text-text text-base leading-6 font-normal my-7">
                При регистрации заезда необходимо предъявить действительное
                удостоверение личности с фотографией и банковскую карту.
                Обратите внимание, что выполнение особых пожеланий не
                гарантировано и может потребовать дополнительной оплаты.
              </p>
              <p className="text-text text-base leading-6 font-normal">
                При заезде необходимо оплатить страховой залог в размере USD
                100. Это около 6480.00 RUB. Платеж производится банковской
                картой. Вы получите внесенную сумму в течение 7 дней. После
                проверки состояния объекта размещения залог будет полностью
                возвращен на вашу банковскую карту.
              </p>
            </div>
          </div>
        </InsideWidthWrapper>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex justify-center bg-backgr">
        <InsideWidthWrapper id="inside_wrapper">
          <h2
            id="standart_h2"
            className="mb-8 text-32 font-semibold text-additional"
          >
            Выбор наших гостей
          </h2>
          <div className="homepage-swiper-navigation white-pagination relative">
            <SwiperCarousel
              breakpoints={[3, 2, 2, 1]}
              navigation={true}
              pagination={true}
              slidesPerView={4}
              data={productsData.data.products.map(
                (product: ProductInterface, index: number): React.ReactNode => {
                  return (
                    <div key={index} className="lg:max-w-305 w-full">
                      <div className="w-full h-289 rounded-20 overflow-hidden swiper_imgBox">
                        <Image
                          src={defaultProductImage}
                          alt={"dacha image"}
                          className="w-full h-full rounded-20 object-cover"
                        />
                      </div>

                      <h3 className="font-semibold text-base mt-5 text-additional">
                        {product.name}
                      </h3>
                      <p className="text-orange text-xs mb-7">
                        {product.address.city}, {product.address.district}
                      </p>
                      <p className="text-text leading-6 text-sm">
                        {product.description}
                      </p>
                      <p className="text-primary my-5">
                        {data.price.amount} {data.price.currency}/{" "}
                        {data.operation_type === "daily_rent"
                          ? "За день"
                          : data.operation_type === "monthly_rent"
                          ? "За месяц"
                          : ""}
                      </p>

                      <button className="py-15 px-43 text-center border border-primary bg-primary text-white rounded-250">
                        Забронировать
                      </button>
                    </div>
                  );
                }
              )}
            />
          </div>
        </InsideWidthWrapper>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;

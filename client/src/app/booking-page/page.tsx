"use client";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "@/redux/features/order/slices/order.slice";
import ThumbCarousel from "@/components/ThumbSlider";
import { AppDispatch } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { addBookingInfo, fetchMyCreatedOrder } from "@/api/orders";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Rating from "@/components/Rating";
import Link from "next/link";
import { redirect } from "next/navigation";
import { selectUser } from "@/redux/features/users/slices/user.slice";
import CustomImage from "@/components/CustomImage";
import { person_green } from "@/imports";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { statusTypes } from "@/redux/status-types";
import { Booking } from "@/interfaces";

const BookingPage: React.FC = () => {
  const { error, data, status } = useSelector(selectOrder);
  const user = useSelector(selectUser);
  const dispatch: AppDispatch = useAppDispatch();
  const accessToken = useLocalStorage("", "accessToken");
  const router = useRouter();
  const [bookingInfo, setBookingInfo] = useState<Booking | null>(null);

  useEffect(() => {
    dispatch(fetchMyCreatedOrder(accessToken));
    setBookingInfo(data.booking_info ?? null);
  }, [dispatch]);

  const handleClick = () => {
    if (!error) {
      const confirmed = window.confirm(
        "Are you sure you want to book this accommodation?"
      );
      if (confirmed) {
        router.push("/thank-page");
      } else {
        return;
      }
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingInfo((prevValues) => ({
      ...prevValues!,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   setBookingInfo(data.booking_info ?? null);
  // }, [data.booking_info]);
  // console.log(bookingInfo, data.booking_info);
  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper className="lg:flex-row flex-col py-[50px] sm:px-[40px] xs:px-[30px] px-[20px] max-w-[1360px]">
        {user.error && (
          <div className="flex rounded-20 mb-8 bg-backgr min-h-62 w-full gap-[20px] items-center px-[32px] py-5">
            <CustomImage image={person_green} alt="" style="max-w-[20px]" />
            <p className="text-text xs:text-xs text-[10px]">
              <strong>Войдите в аккаунт</strong>, чтобы использовать сохраненные
              данные, или <strong>зарегистрируйтесь</strong>, чтобы управлять
              бронированиями, где бы вы ни были.
            </p>
          </div>
        )}
        {status == statusTypes.LOADING ||
        status == statusTypes.INIT ||
        status == null ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="flex gap-5 w-full booking_GigaNiggaContainer">
            <aside className="max-w-305 w-full booking_aside1">
              <div id="shadow_box" className="rounded-10">
                <div className="px-4 py-6">
                  <h3 className="text-sm text-additional font-semibold">
                    Детали цены
                  </h3>
                  {/* <p className="text-xs text-grey font-normal">
                  Двухместный номер с 1 кроватью
                </p> */}
                </div>
                <div className="flex rounded-b-10 bg-additional px-4 py-4 text-white justify-between text-sm font-semibold">
                  <h3>Цена</h3>
                  <p>1 900 112 сум</p>
                </div>
              </div>
              <div
                id="shadow_box"
                className="mt-7 rounded-20 bg-additional px-6 py-6"
              >
                <h2 className="text-lg text-backgr font-semibold">
                  Условия бронирования
                </h2>
                <p className="my-5 text-secondGrey text-xs font-normal">
                  Это предложение предоставлено компанией-партнером Booking.com,
                  благодаря чему вам доступны более выгодные цены.
                </p>
                <div>
                  <h3 className="text-xs text-backgr font-semibold">
                    Стоимость не возвращается
                  </h3>
                  <p className="mb-5 mt-2 text-secondGrey text-xs font-normal">
                    При отмене или изменении бронирования, а также в случае
                    незаезда оплата не возвращается.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs text-backgr font-semibold">
                    Оплата заранее
                  </h3>
                  <p className="mb-5 mt-2 text-secondGrey text-xs font-normal">
                    Вы оплатите бронирование сегодня через Booking.com — это
                    безопасно.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs text-backgr font-semibold">
                    Изменения не допускаются
                  </h3>
                  <p className="mb-5 mt-2 text-secondGrey text-xs font-normal">
                    После завершения бронирования изменить личную информацию и
                    данные бронирования невозможно. Вы сможете отправить запрос
                    напрямую в объект размещения, но его выполнение не
                    гарантируется.
                  </p>
                </div>
              </div>
            </aside>
            <aside className="w-full">
              <div className="flex gap-[30px] booking_container1">
                <div className="flex-1">
                  <ThumbCarousel type={2} images={data.product.images || []} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-22 text-additional font-semibold mb-[10px]">
                      {data.product.name}
                    </h2>
                    <Rating
                      setRating={() => {}}
                      rating={NaN}
                      view={true}
                      productRating={data.product.rating}
                    />
                    <h4 className="text-xs text-text font-normal mt-[20px]">
                      {data.product.address.city},{" "}
                      {data.product.address.district},{" "}
                      {data.product.address.street}{" "}
                      {data.product.address.details}
                    </h4>
                    <p className="bg-backgr inline-block px-14 py-06 rounded-250 text-text text-sm font-normal mt-[12px] mb-[40px]">
                      Апартаменты/квартиры
                    </p>
                  </div>
                  <p className="text-xs text-text font-normal leading-6">
                    {data.product.description}
                  </p>
                </div>
              </div>
              <form
                action={(formData) => {
                  dispatch(addBookingInfo(accessToken, formData));
                }}
                className="w-full bg-backgr rounded-20 py-8 px-12 mt-12 booking_form"
              >
                <h3 className="text-sm text-additional font-semibold">
                  Просто заполните обязательные поля (*).
                </h3>
                <div className="flex w-full gap-5 justify-between my-5 booking_box1">
                  <input
                    className="bg-backgr py-17 px-20 max-w-420 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                    placeholder="Дата заезда"
                    type="date"
                    name="entry_date"
                    value={bookingInfo?.entry_date}
                    onChange={handleOnChange}
                  />
                  <input
                    className="bg-backgr py-17 px-20 max-w-420 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                    value={bookingInfo?.leaving_date}
                    onChange={handleOnChange}
                    placeholder="Дата отбытия"
                    type="date"
                    name="leaving_date"
                  />
                  <input
                    className="bg-backgr py-17 px-20 max-w-420 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                    value={bookingInfo?.guests}
                    onChange={handleOnChange}
                    placeholder="Колличество гостей *"
                    type="number"
                    name="guests"
                  />
                </div>
                <div className="flex w-full gap-5 justify-between mb-[20px] booking_box1">
                  <input
                    className="bg-backgr py-17 px-20 max-w-420 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                    value={bookingInfo?.name}
                    onChange={handleOnChange}
                    placeholder="Имя (латиницей) *"
                    type="text"
                    name="name"
                  />
                  <input
                    className="bg-backgr py-17 px-20 max-w-420 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                    value={bookingInfo?.lastName}
                    onChange={handleOnChange}
                    placeholder="Фамилия (латиницей) *"
                    type="text"
                    name="lastname"
                  />
                </div>
                <div className="flex w-full items-center gap-5 justify-between booking_box1">
                  <input
                    className="bg-backgr py-17 px-20 max-w-420 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                    value={bookingInfo?.email}
                    onChange={handleOnChange}
                    placeholder="Адрес электронной почты *"
                    type="text"
                    name="email"
                  />
                  <input
                    className="bg-backgr py-17 px-20 max-w-420 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                    value={bookingInfo?.phone}
                    onChange={handleOnChange}
                    placeholder="Номер телефона (мобильный) *"
                    type="number"
                    name="phone"
                  />
                </div>
                <div className="flex items-center gap-12 mt-6 booking_box2">
                  <p className="text-sm text-grey font-normal">
                    При заезде требуется предъявить удостоверение личности, имя
                    и фамилия в котором совпадают с этими. Эти имя и фамилию
                    нельзя будет поменять позже.
                  </p>
                  <button
                    onClick={handleClick}
                    className="cursor-pointer w-full max-w-342 py-15 px-43 text-center border border-primary bg-primary text-white rounded-250"
                    type="submit"
                  >
                    Забронировать
                  </button>
                </div>
              </form>
            </aside>
          </div>
        )}
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default BookingPage;

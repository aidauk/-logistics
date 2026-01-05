"use client";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { defaultProductImage, person_green, uzcardHumo, visa } from "@/imports";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { selectOrder } from "@/redux/features/order/slices/order.slice";
import { useAppDispatch } from "@/redux/hooks";
import { AppDispatch } from "@/redux/store";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { fetchMyCreatedOrder, payOrder } from "@/api/orders";
import CustomImage from "@/components/CustomImage";
import { selectUser } from "@/redux/features/users/slices/user.slice";
import { useRouter } from "next/navigation";

const PayPage = () => {
  const { error, data, status } = useSelector(selectOrder);
  const user = useSelector(selectUser);
  const dispatch: AppDispatch = useAppDispatch();
  const accessToken = useLocalStorage("", "accessToken");
  const router = useRouter();

  const handleClick = () => {
    if (data.isPaid == true) {
      router.push("/thank-page");
    }
    return;
  };

  useEffect(() => {
    dispatch(fetchMyCreatedOrder(accessToken));
  }, [dispatch]);

  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper
        // id="inside_wrapper"
        className="flex flex-col py-[50px] sm:px-[40px] xs:px-[30px] px-[20px] max-w-[1360px]"
      >
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
        <div className="flex gap-5 md:flex-row flex-col">
          <aside className="md:max-w-305 w-full max-w-full">
            <div className="mb-12 pay_hidden">
              <div className="w-full">
                <Image
                  width={1000}
                  height={1000}
                  alt="Slider main image"
                  src={data.product.images[0]?.uri || defaultProductImage}
                  className="w-full h-full rounded-10 object-cover"
                />
              </div>
              <h3 className="text-base font-semibold text-additional mt-5 mb-3">
                {data.product.name}
              </h3>
              <p className="text-primary text-xs font-normal">
                {data.product.address.city}, {data.product.address.district},{" "}
                {data.product.address.street} {data.product.address.details}
              </p>
              {/* icons */}
            </div>
            <div id="shadow_box" className="rounded-20 my-7 w-full pb-3">
              <h3 className="pl-4 py-3 rounded-t-20 bg-additional text-backgr text-sm font-medium">
                Детали вашего бронирования
              </h3>
              <div className="pl-4 py-2 my-2">
                <h4 className="text-xs text-secondary font-medium">Заезд</h4>
                <p className="text-xs text-grey">
                  {data.booking_info?.entry_date || "информация не заполнилась"}
                </p>
              </div>
              <div className="pl-4 py-2">
                <h4 className="text-xs text-secondary font-medium">Отъезд:</h4>
                <p className="text-xs text-grey">
                  {data.booking_info?.leaving_date ||
                    "информация не заполнилась"}
                </p>
              </div>
            </div>
            <div id="shadow_box" className="rounded-20">
              <div className="px-4 py-6">
                <h3 className="text-sm text-additional font-semibold">
                  Детали цены
                </h3>
                {/* <p className="text-xs text-grey font-normal">
                  Двухместный номер с 1 кроватью
                </p> */}
              </div>
              <div className="flex rounded-b-20 bg-additional px-4 py-4 text-white justify-between text-sm font-semibold">
                <h3>Цена</h3>
                <p>
                  {data.product.price.amount}, {data.product.price.currency}
                </p>
              </div>
            </div>
          </aside>
          <aside className="flex-1">
            <form  action={(formData) => {
                dispatch(payOrder(accessToken));
              }} className="w-full pay_form">
              <div className="bg-backgr rounded-20 py-[32px] xs:px-[48px] px-[20px]">
                <h2 className="text-lightBlack text-22 font-semibold mb-1">
                  Как вы хотите заплатить?
                </h2>
                <div className="flex mb-9">
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                  <label htmlFor="html" className="max-w-91 mr-8 ml-2">
                    <Image
                      alt="Slider main image"
                      src={visa}
                      className="w-full rounded-10 object-cover"
                    />
                  </label>
                  <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                  />
                  <label htmlFor="html" className="max-w-91 ml-2">
                    <Image
                      alt="Slider main image"
                      src={uzcardHumo}
                      className="w-full rounded-10 object-cover"
                    />
                  </label>
                </div>
                <div className="flex gap-5 pay_box1">
                  <input
                    className="bg-backgr py-17 px-20 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                    placeholder="Номер карты*"
                    type="text"
                    name=""
                    id=""
                  />
                  <div className="flex w-full justify-between xs:gap-[20px] gap-[8px]">
                    <input
                      className="bg-backgr py-17 px-20 xl:w-[209px] w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                      placeholder="Срок действия*"
                      type="text"
                      name=""
                      id=""
                    />
                    <input
                      className="bg-backgr py-17 px-20 xl:w-[209px] w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                      placeholder="CVC-код*"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>
                <input
                  className="bg-backgr xs:mt-[20px] mt-[8px]  py-17 px-20 w-full border border-additional_border text-additional rounded-250 outline-none text-xs"
                  placeholder="Имя держателя карты*"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="p-8 pay_agree">
                <input
                  type="checkbox"
                  id="first"
                  name="vehicle1"
                  value="Bike"
                  className="mr-2"
                />
                <label
                  htmlFor="first"
                  className="text-xs text-additional font-medium leading-15"
                >
                  Я соглашаюсь получать маркетинговые рассылки, включая
                  спецпредложения, вдохновляющие материалы о путешествиях, а
                  также новости о продуктах и услугах Dachilla.uz
                </label>
                <br />{" "}
                <input
                  type="checkbox"
                  id="second"
                  name="vehicle1"
                  value="Bike"
                  className="mt-5 mb-3 mr-2"
                />
                <label
                  htmlFor="second"
                  className="text-xs text-additional font-medium"
                >
                  Я соглашаюсь получать маркетинговые рассылки от Booking.com о
                  спецпредложениях на транспортные услуги Dachilla.uz
                </label>
                <br />
                <p className="text-10 text-grey font-medium">
                  Вы можете отписаться от рассылки в любое время. Посмотрите
                  наше положение о конфиденциальности.
                </p>
                <button
                  onClick={handleClick}
                  className="cursor-pointer list-none mt-9 py-15 px-43 text-center border border-primary bg-primary text-white rounded-250 pay_submit"
                >
                  Оплатить и завершить бронирование
                </button>
              </div>
            </form>
          </aside>
        </div>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default PayPage;

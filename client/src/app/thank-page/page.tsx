'use client'
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { verify } from "@/imports";
import { selectOrder } from "@/redux/features/order/slices/order.slice";
import { useAppDispatch } from "@/redux/hooks";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const ThankPage = () => {

  const { error, data, status } = useSelector(selectOrder);
  const dispatch: AppDispatch = useAppDispatch();
  const accessToken = useLocalStorage("", "accessToken"); 

  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper id="inside_wrapper" className="flex gap-6 thank_giga">
        <aside className="max-w-305 w-full">
          <div className="mb-12">
            <div className="w-full">
              <Image
                alt="Slider main image"
                src={''}
                className="w-full h-full rounded-10 object-cover"
              />
            </div>
            <h3 className="text-base font-semibold text-additional mt-5 mb-3">
              Villas at Marina Inn at Grande Dunes
            </h3>
            <p className="text-primary text-xs font-normal">
              город Ташкент, Яккасарайский район, Бабура
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
                воскресенье, 15 января 2023, с 15:00
              </p>
            </div>
            <div className="pl-4 py-2">
              <h4 className="text-xs text-secondary font-medium">Отъезд:</h4>
              <p className="text-xs text-grey">
                понедельник, 16 января 2023, до 11:00
              </p>
            </div>
          </div>
        </aside>
        <aside className="flex-1 flex flex-col items-center text-center p-12">
          <div className="w-114 mb-12">
            <Image
              alt="Slider main image"
              src={verify}
              className="w-full h-full rounded-10 object-cover"
            />
          </div>
          <h2
            id="standart_h2"
            className="text-32 text-additional font-semibold"
          >
            Вы успешно забронировали недвижимость спасибо за доверие!
          </h2>
          <p className="my-4 text-lg text-text font-normal">
            В скором времени наши менеджеры с вами свяжутся.
          </p>
          <Link href='/cabinet/my-bookings' className="mt-3 py-15 px-43 text-center border border-primary bg-primary text-white rounded-250">
              Вернуться на мои бронирования
          </Link>
        </aside>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default ThankPage;

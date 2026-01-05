import { logout } from "@/api/users";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const ProfileLinks = ({ type }: { type?: number }) => {
  const pathname = usePathname();

  const dispatch: AppDispatch = useDispatch();

  return (
    <aside
      className={
        type == 2 ? "absolute top-[70px] right-0 lg:w-[300px]" : "lg:w-[371px]"
      }
    >
      <div id="shadow_box" className="change_box2">
        <ul className="flex flex-col change_box_child2">
          <Link
            href={"/cabinet/user-info"}
            className={`text-sm px-[20px] py-[13px] cursor-pointer ${
              pathname == "/cabinet/user-info"
                ? "bg-primary text-white"
                : "bg-white text-additional hover:bg-secondary hover:text-white"
            }`}
          >
            {type == 2 ? "Управление аккаунтом" : "Персональные данные"}
          </Link>
          <Link
            href={"/cabinet/my-bookings"}
            className={`text-sm px-[20px] py-[13px] cursor-pointer ${
              pathname == "/cabinet/my-bookings"
                ? "bg-primary text-white"
                : "bg-white text-additional hover:bg-secondary hover:text-white"
            }`}
          >
            Мои бронирования
          </Link>
          <Link
            href={"/cabinet/favorites"}
            className={`text-sm px-[20px] py-[13px] cursor-pointer ${
              pathname == "/cabinet/favorites"
                ? "bg-primary text-white"
                : "bg-white text-additional hover:bg-secondary hover:text-white"
            }`}
          >
            Избранное
          </Link>
          {type == 2 ? (
            <>
              {" "}
              <button
                className={`text-sm px-[20px] logout bg-white text-left rounded-b-10 text-additional hover:bg-secondary hover:text-white py-[13px] cursor-pointer`}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              {" "}
              <Link
                href={"/cabinet/payment-info"}
                className={`text-sm px-[20px] py-[13px] cursor-pointer ${
                  pathname == "/cabinet/payment-info"
                    ? "bg-primary text-white"
                    : "bg-white text-additional hover:bg-secondary hover:text-white"
                }`}
              >
                Платежные данные
              </Link>
              <Link
                href={"/cabinet/my-places"}
                className={`text-sm px-[20px] py-[13px] cursor-pointer ${
                  pathname == "/cabinet/my-places"
                    ? "bg-primary text-white"
                    : "bg-white text-additional hover:bg-secondary hover:text-white"
                }`}
              >
                Мои объекты
              </Link>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default ProfileLinks;

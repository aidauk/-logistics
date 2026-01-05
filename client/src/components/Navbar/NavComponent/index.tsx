"use client";
import MaxWidthWrapper from "../../MaxWidthWrapper";
import InsideWidthWrapper from "../../InsideWrapper";
import Image from "next/image";
import close_menu from "../../../../public/images/arrow.png";
import menu from "../../../../public/images/menu.png";
import person from "../../../../public/images/person.png";
import Header from "../../Header";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  selectModal,
} from "@/redux/features/modal-window/modal-window.slice";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import { selectUser } from "@/redux/features/users/slices/user.slice";
import CustomImage from "@/components/CustomImage";
import { down_arrow_black, logo } from "@/imports";
import Link from "next/link";
import ProfileLinks from "@/components/ProfileLinks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAppDispatch } from "@/redux/hooks";
import { getCurrentUser, logout } from "@/api/users";

const NavComponent = ({
  sideBarActive,
  setActive,
}: {
  sideBarActive: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { active } = useSelector(selectModal);
  const { data } = useSelector(selectUser);
  const dispatch: AppDispatch = useAppDispatch();
  const accessToken = useLocalStorage("", "accessToken");

  let mainNav = true;

  useEffect(() => {
    if (accessToken.length > 0) {
      dispatch(getCurrentUser(accessToken));
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (String(e.target.className).includes("profile")) {
        return;
      } else if (String(e.target.className).includes("logout")) {
        return dispatch(logout);
      }
      console.log(String(e.target.className).includes("logout"), e.target.className)
      setIsOpen(false);
    });
  });

  return (
    <MaxWidthWrapper className="z-10 fixed right-0 left-0 top-0">
      <div className={"bg-white flex justify-center " + (!mainNav && "hidden")}>
        <Header />
      </div>
      <div className="bg-backgr flex justify-center">
        <InsideWidthWrapper className="py-0 max-w-[1280px] mx-[20px] sm:mx-[40px] xs:mx-[30px]">
          <header className="flex items-center h-[64px] lg:h-[131px] justify-between">
            <div className="flex gap-[20px] items-center">
              <Link href="/">
                <CustomImage
                  image={logo}
                  alt="dachilla-logo"
                  style=" max-w-[100px]"
                />
              </Link>
              <select
                name="lang"
                className={
                  "text-xs px-[20px] py-[6px] outline-none rounded-[250px] " +
                  (mainNav && "hidden")
                }
              >
                <option value="russian">Russian</option>
                <option value="uzbek">Uzbek</option>
                <option value="english">English</option>
                <option value="german">German</option>
              </select>
            </div>
            <aside className="flex gap-[20px]">
              <ul
                className={
                  "lg:flex hidden xl:gap-[36px] gap-[24px] items-center text-base text-additional font-medium mr-[20px] " +
                  (!mainNav && "hidden")
                }
              >
                <li>
                  <a href="/" className="hover:text-secondary">
                    Главная
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-secondary">
                    Аренда
                  </a>
                </li>
                <li>
                  <a href="#form_box" className="hover:text-secondary">
                    Контакты
                  </a>
                </li>
                <li className="flex items-center">
                  <a href="/about" className="hover:text-secondary">
                    О нас
                  </a>
                </li>
              </ul>
              <div className="lg:flex hidden gap-[6px] relative">
                <div
                  className={
                    "flex list-none gap-[20px] " +
                    ((!mainNav || data.email) && "hidden")
                  }
                >
                  <button
                    onClick={() =>
                      dispatch(openModal({ type: ModalWindowTypes.LOGIN }))
                    }
                    className="hover:bg-primary hover:text-white transition-all cursor-pointer py-[15px] px-[43px] text-center border text-primary border-primary rounded-[250px]"
                  >
                    Вход
                  </button>
                  <button
                    onClick={() =>
                      dispatch(openModal({ type: ModalWindowTypes.REGISTER }))
                    }
                    className="hover:bg-primary hover:text-white transition-all cursor-pointer py-[15px] px-[43px] text-center border text-primary border-primary rounded-[250px]"
                  >
                    Регистрация
                  </button>
                </div>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className={
                    "flex cursor-pointer items-center gap-0 profile " +
                    (!data.email && "hidden")
                  }
                >
                  <div className="w-[56px] h-[56px] rounded-1/2 mr-[10px] profile ">
                    <Image
                      id="person"
                      src={person}
                      alt={"menu image"}
                      className="w-full object-cover h-full rounded-1/2 border-[3px] profile border-secondary"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base profile">
                      {data.name}
                    </h3>
                    <p className="font-normal text-sm profile">
                      Личный кабинет
                    </p>
                  </div>
                </div>
                <div className={`${isOpen == false && "hidden"}`}>
                  <ProfileLinks type={2} />
                </div>
                <div
                  className={
                    "flex list-none gap-[20px] " +
                    ((mainNav || data.email) && "hidden")
                  }
                >
                  <button className="hover:bg-primary hover:text-white transition-all cursor-pointer py-[15px] px-[43px] text-center border text-primary border-primary rounded-[250px]">
                    Вход
                  </button>
                  <button className="hover:bg-primary hover:text-white transition-all cursor-pointer py-[15px] px-[43px] text-center border text-primary border-primary rounded-[250px]">
                    Регистрация
                  </button>
                </div>
              </div>
              <div
                id="burger_menu"
                onClick={() => setActive(!sideBarActive)}
                className="w-[40px] h-[40px] p-[8px] bg-primary rounded-1/2 hidden"
              >
                <Image
                  id="burger_menu_image"
                  src={menu}
                  alt={"menu image"}
                  className={"w-full " + (active && "hidden")}
                />
                <Image
                  id="close_menu_image"
                  src={close_menu}
                  alt={"close_menu image"}
                  className={"w-full " + (!active && "hidden")}
                />
              </div>
            </aside>
          </header>
        </InsideWidthWrapper>
      </div>
    </MaxWidthWrapper>
  );
};

export default NavComponent;

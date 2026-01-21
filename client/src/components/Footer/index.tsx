import Image from "next/image";
import InsideWidthWrapper from "../InsideWrapper";
import MaxWidthWrapper from "../MaxWidthWrapper";

const Footer = () => {
  let mainNav = true;
  return (
    <MaxWidthWrapper className="bg-primary flex justify-center">
      <InsideWidthWrapper id="inside_wrapper">
        <div id="footer" className="flex gap-9">
          <div
            className={
              "w-full " +
              (!mainNav
                ? "max-w-full flex justify-between items-center footer_first_con"
                : "footer_first_col max-w-305 mr-9")
            }
          >
            <div className={" " + (!mainNav && "flex items-center gap-20 footer2_box")}>
              <div className="bg-white px-16 py-3 rounded-250 max-w-305 w-full">
                <Image src={""} className="" alt="logo" />
              </div>
              <div
                className={
                  "flex gap-5 " + (mainNav && "hidden footer_social")
                }
              >
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
              </div>
            </div>
            <button
              className={
                "py-15 px-43 my-9 text-center bg-black_dark text-white rounded-250 " +
                (!mainNav && "hidden")
              }
            >
              Добавить объявление
            </button>
            <p
              className={
                "text-xs font-normal text-white " + (mainNav && " footer_text")
              }
            >
              Copyright © 1996–2022 Chilla. <br /> Все права защищены.
            </p>
          </div>
          <div
            id="footer_second_col"
            className={"w-full flex gap-9 " + (!mainNav && "hidden")}
          >
            <div id="footer_box" className="flex-1">
              <h3
                id="footer_h3"
                className="text-white text-base font-semibold mb-7"
              >
                Контактная информация
              </h3>
              <p className="text-xs font-normal text-rgbWhite my-4">
                ИП ООО «Seide International», г.Ташкент, Мирабадский район, ул.
                Хонзодабегим, 9,
              </p>
              <p className="text-xs font-normal text-rgbWhite mb-4">
                Тел: +998-90-992-9626
              </p>
              <p className="text-xs font-normal text-rgbWhite ">
                Эл. Почта: info@uybor.uz
              </p>
              <div id="footer_social" className="flex gap-5 mt-12">
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
              </div>
            </div>
            <div id="footer_box" className="flex-1">
              <h3
                id="footer_h3"
                className="text-white text-base font-semibold mb-7"
              >
                Пользователям
              </h3>
              <li className="list-none mb-1">
                <a href="/about" className="text-xs font-normal text-rgbWhite">
                  О нас
                </a>
              </li>
              <li className="list-none mb-1">
                <a href="/help" className="text-xs font-normal text-rgbWhite">
                  Помощь
                </a>
              </li>
              <li className="list-none mb-1">
                <a href="/" className="text-xs font-normal text-rgbWhite">
                  Условия использования
                </a>
              </li>
              <li className="list-none mb-1">
                <a href="/privacy-policy" className="text-xs font-normal text-rgbWhite">
                  Политика конфиденциальности
                </a>
              </li>
              <li className="list-none mb-1">
                <a href="/news-page" className="text-xs font-normal text-rgbWhite">
                  Блог
                </a>
              </li>
              <li className="list-none">
                <a href="/category" className="text-xs font-normal text-rgbWhite">
                  Аренда
                </a>
              </li>
            </div>
            <div id="footer_box" className="flex-1">
              <h3
                id="footer_h3"
                className="text-white text-base font-semibold mb-7"
              >
                Арендодателям
              </h3>
              <li className="list-none mb-1">
                <a href="/cabinet" className="text-xs font-normal text-rgbWhite">
                  Личный кабинет
                </a>
              </li>
              <li className="list-none mb-1">
                <a href="/signup" className="text-xs font-normal text-rgbWhite">
                  Регистрация
                </a>
              </li>
              <li className="list-none mb-1">
                <a href="/help" className="text-xs font-normal text-rgbWhite">
                  Помощь
                </a>
              </li>
              <li className="list-none mb-1">
                <a href="/about" className="text-xs font-normal text-rgbWhite">
                  Информация
                </a>
              </li>
              <div id="footer_social2" className="gap-5 mt-12 hidden">
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
                <div className="bg-white h-30 w-30 rounded-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default Footer;

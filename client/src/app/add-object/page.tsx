"use client";
import CustomSelect from "@/components/CustomSelect";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { modernApartmanent } from "@/imports";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const options = [
  { value: "6602be9524279ec4e26a952d", label: "Квартира" },
  { value: "668bdf92ed93cc7f62552116", label: "Котедж" },
  { value: "668bdf9ced93cc7f62552117", label: "Дача" },
];

const AddoBjectPage = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    localStorage.setItem("category", value);
  };


  function addInfoLocalStorage(formData: FormData) {
    const information = [
      "fullname",
      "phone",
      "email",
    ];
    for (let item of information) {
      localStorage.setItem(item, formData.get(item) as string);
    }
    if (!localStorage.getItem("category")) {
      return console.log("Please select a category");
    }
    router.push("/add-object-information");
  }

  return (
    <MaxWidthWrapper>
      <section className="relative flex justify-center">
        <div className="w-full absolute h-full bg-black z-20 opacity-40"></div>
        <Image
          className="w-full absolute object-cover h-full z-10"
          src={modernApartmanent}
          alt="main home background image"
        />
        <InsideWidthWrapper
          id="inside_wrapper"
          className="flex gap-0 justify-between lg:flex-row flex-col sm:gap-24"
        >
          <aside className="relative z-30">
            <h1
              id="homePage_title"
              // className="text-[20px] leading-[24.38px] font-bold xs:text-[26px] xs:leading-[30.38px] sm:text-[32px] sm:leading-[36px] md:text-[46px] md:leading-[56px] text-white first-letter"
              className="font-bold text-50 leading-56 text-white"
            >
              Зарегистрируйте апартаменты/квартиру на Dachila.uz
            </h1>
            <h3
              id="homePage_subtitle"
              className="font-normal text-3xl text-white sm:my-0 my-[40px]"
            >
              Регистрация бесплатная и занимает всего 5 минут — начните сейчас
            </h3>
          </aside>
          <aside className="max-w-413 w-full relative z-30">
            <form
              action={(formData) => {
                addInfoLocalStorage(formData);
              }}
              className="flex flex-col gap-5 w-full bg-white rounded-20 px-7 py-9"
            >
              <CustomSelect
                type={3}
                options={options}
                onChange={handleSelectChange}
                placeholder="Выберите тип места"
              />

              <input
                type="text"
                required
                placeholder="ФИО"
                name="fullname"
                id=""
                className="w-full border border-border outline-none rounded-250 py-17 px-20 text-text text-xs font-normal"
              />
              <input
                type="text"
                required
                placeholder="Телефон"
                name="phone"
                id=""
                className="w-full border border-border outline-none rounded-250 py-17 px-20 text-text text-xs font-normal"
              />
              <input
                type="text"
                required
                placeholder="Эл. Почта"
                name="email"
                id=""
                className="w-full border border-border outline-none rounded-250 py-17 px-20 text-text text-xs font-normal"
              />
              <button
                type="submit"
                className="bg-primary cursor-pointer w-full text-center text-base text-white outline-none py-15 rounded-250"
              >
                Создать новый проект
              </button>
            </form>
          </aside>
        </InsideWidthWrapper>
      </section>
      <section className="w-full bg-backgr flex justify-center">
        <InsideWidthWrapper
          className="flex lg:flex-row flex-col"
          id="inside_wrapper"
        >
          <h2
            id="standart_h2"
            className="text-32 text-black_dark font-semibold lg:mr-24 singup_h2 text-left"
          >
            Что предлагает
            <p className="inline"> </p>
            <br className="signup_br"></br>
            Dachilla.uz?
          </h2>
          <aside className="flex-1">
            <div className="mb-9 singup_textBox">
              <h3 className="text-20 text-black_dark font-semibold mb-2">
                Огромный выбор
              </h3>

              <p className="text-lg text-text font-normal leading-8">
                На Booking.com можно забронировать самые разнообразные варианты
                проживания: от стильных городских квартир и уютных загородных
                мини-гостиниц до роскошных курортных отелей на пляже.
              </p>
            </div>
            <div className="mb-9 singup_textBox">
              <h3 className="text-20 text-black_dark font-semibold mb-2">
                Низкие цены
              </h3>

              <p className="text-lg text-text font-normal leading-8">
                Booking.com гарантирует, что вы можете получить лучшую цену.
                Если найдете дешевле, мы вернем разницу в стоимости — вы всегда
                остаетесь в выигрыше.
              </p>
            </div>
            <div className="mb-9 singup_textBox">
              <h3 className="text-20 text-black_dark font-semibold mb-2">
                Моментальное подтверждение
              </h3>

              <p className="text-lg text-text font-normal leading-8">
                Бронирования Booking.com подтверждаются автоматически и
                мгновенно. Чтобы забронировать вариант, который пришелся вам по
                душе, нужно всего несколько действий.
              </p>
            </div>
            <div className="mb-9 singup_textBox">
              <h3 className="text-20 text-black_dark font-semibold mb-2">
                Бронирование без комиссии
              </h3>

              <p className="text-lg text-text font-normal leading-8">
                Мы не взимаем комиссию за оформление бронирования или другие
                услуги. Во многих случаях бронирование можно отменить бесплатно.
              </p>
            </div>
            <div className="mb-9 singup_textBox">
              <h3 className="text-20 text-black_dark font-semibold mb-2">
                Безопасность
              </h3>

              <p className="text-lg text-text font-normal leading-8 mb-8">
                Каждый день мы помогаем осуществить через нашу надежную
                платформу сотни тысяч транзакций. Мы поддерживаем самые высокие
                стандарты безопасности, чтобы гарантировать сохранность ваших
                данных. Подробности в «Положении о конфиденциальности».
              </p>
            </div>
            <div className="mb-9 singup_textBox">
              <h3 className="text-20 text-black_dark font-semibold mb-2">
                Круглосуточная поддержка
              </h3>

              <p className="text-lg text-text font-normal leading-8">
                Наша команда ответит на вопросы и защитит ваши интересы на любом
                этапе: как после бронирования, так и во время поездки. Поддержка
                оказывается круглосуточно на более чем 40 языках. Не забудьте
                прочитать «Часто задаваемые вопросы» для путешественников.
              </p>
            </div>
          </aside>
        </InsideWidthWrapper>
      </section>
    </MaxWidthWrapper>
  );
};

export default AddoBjectPage;

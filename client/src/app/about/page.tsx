"use client";
import FlexWrap from "@/components/FlexWrap";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { useState } from "react";
import { contactImage2 } from "@/imports";
import { aboutUs, importInfos } from "@/lib/data";
import CustomSelect from "@/components/CustomSelect";
import { createApplicaiton } from "@/api/applications";

const options = [
  {
    value: "О компании",
    label: "О Dachilla.uz",
    text: `Компания Booking.com, основанная в 1996 году в Амстердаме, прошла путь от
      маленького голландского стартапа до одного из мировых цифровых лидеров в сфере путешествий. Миссия Booking.com, 
      подразделения Booking Holdings Inc. (NASDAQ: BKNG), — делать путешествия доступными каждому. Инвестируя в технологии, которые помогают путешествовать без хлопот, Booking.com предлагает миллионам гостей 
      потрясающие варианты досуга, транспортные услуги и невероятное жилье, начиная от домов и заканчивая отелями и не 
      только. Будучи крупнейшей в мире туристической платформой как для известных брендов, так и для предпринимателей разного уровня, Booking.com помогает владельцам объектов размещения по всему миру привлекать гостей и расширять бизнес`,
  },
  {
    value: "Юридическая информация",
    label: "Юридическая информация",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam expedita sit quasi ullam quos cupiditate molestias, nobis perspiciatis delectus dolorum earum cumque eaque dolor culpa ipsum facere vel, praesentium aliquid molestiae debitis laboriosam. Et asperiores non enim obcaecati necessitatibus consectetur blanditiis quod iure sapiente. Harum enim autem adipisci dolor?",
  },
  {
    value: "Правила и условия",
    label: "Правила и условия",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam expedita sit quasi ullam quos cupiditate molestias, nobis perspiciatis delectus dolorum earum cumque eaque dolor culpa ipsum facere vel, praesentium aliquid molestiae debitis laboriosam. Et asperiores non enim obcaecati necessitatibus consectetur blanditiis quod iure sapiente. Harum enim autem adipisci dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam expedita sit quasi ullam quos cupiditate molestias, nobis perspiciatis delectus dolorum earum cumque eaque dolor culpa ipsum facere vel, praesentium aliquid molestiae debitis laboriosam. Et asperiores non enim obcaecati necessitatibus consectetur blanditiis quod iure sapiente. Harum enim autem adipisci dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam expedita sit quasi ullam quos cupiditate molestias, nobis perspiciatis delectus dolorum earum cumque eaque dolor culpa ipsum facere vel, praesentium aliquid molestiae debitis laboriosam. Et asperiores non enim obcaecati necessitatibus consectetur blanditiis quod iure sapiente. Harum enim autem adipisci dolor?",
  },
  {
    value: "Вакансии",
    label: "Вакансии",
    text: "quasi ullam quos cupiditat, is pespiciatis earum cumque eaque dolor culpa ipsum facere vel, praesentium aliquid molestiae debitis laboriosam. Et asperiores non enim obcaecati necessitatibus consectetur blanditiis quod iure sapiente. Harum enim autem adipisci dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam expedita sit quasi ullam quos cupiditate molestias, nobis perspiciatis delectus dolorum earum cumque eaque dolor culpa ipsum facere vel, praesentium aliquid molestiae debitis laboriosam. Et asperiores non enim obcaecati necessitatibus consectetur blanditiis quod iure sapiente. Harum enim autem adipisci dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam expedita sit quasi ullam quos cupiditate molestias, nobis perspiciatis delectus dolorum earum cumque eaque dolor culpa ipsum facere vel, praesentium aliquid molestiae debitis laboriosam. Et asperiores non enim obcaecati necessitatibus consectetur blanditiis quod iure sapiente. Harum enim autem adipisci dolor?",
  },
  {
    value: "Прес-центр",
    label: "Прес-центр",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aliquam expedita sit quasi ullam quos cupiditate molestias, nobis perspiciatis delectus dolorum earum cumque eaque dolor culpa ipsum facere vel, praesentium aliquid molestiae debitis laboriosam. Et asperiores non enim obcaecati necessitatibus consectetur blanditiis quod iure sapiente. Harum enim autem adipisci dolor?",
  },
];

const categoryOptions = [
  { value: "6602be9524279ec4e26a952d", label: "Квартира" },
  { value: "668bdf92ed93cc7f62552116", label: "Котедж" },
  { value: "668bdf9ced93cc7f62552117", label: "Дача" },
];
const About: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSelectCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const [selectedValue, setSelectedValue] = useState<string>(options[0].value);

  const selectedOption = options.find((item) => item.value === selectedValue);

  const handleSelectChange = (
    value: string,
    event?: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(value);
    event?.currentTarget.classList.add("bg-primary text-white");
  };

  return (
    <main>
      <MaxWidthWrapper className="bg-white flex justify-center">
        <InsideWidthWrapper
          id="inside_wrapper"
          className="flex gap-40 relative lg:flex-row flex-col"
        >
          <aside className="lg:mr-5">
            <div id="shadow_box" className="lg:w-371 change_box">
              <ul className="change_box_child">
                {options.map((option, index) => (
                  <li
                    className={`text-sm px-5 py-3 cursor-pointer ${
                      selectedValue === option.value
                        ? "bg-primary text-white"
                        : ""
                    }`}
                    onClick={() => handleSelectChange(option.value)}
                    key={index}
                  >
                    {option.value}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <aside>
            <h2
              id="leftsided_h2"
              className="text-32 font-semibold text-additional mb-8"
            >
              {selectedOption?.label}
            </h2>
            {selectedOption && selectedOption.text && (
              <p className="text-text xs:text-lg text-base leading-[28px] font-normal xs:leading-[30px]">
                {selectedOption.text}
              </p>
            )}
          </aside>
        </InsideWidthWrapper>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="flex justify-center bg-backgr text-center xs:text-left">
        <InsideWidthWrapper id="inside_wrapper">
          <h2
            id="standart_h2"
            className="text-32 mb-8 font-semibold text-additional"
          >
            Почему Dachilla?
          </h2>

          <FlexWrap
            className="lg:flex-row md:flex-col flex-nowrap justify-start gap-5"
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
          className="lg:py-80 md:py-80 text-center flex flex-col "
        >
          <h2
            id="form_h2"
            className="text-32 font-semibold text-additional mb-2"
          >
            Миллион причин присоединиться к нам
          </h2>
          <div className="w-full flex items-center justify-center">
            <p className="text-text w-full xs:text-lg text-base font-normal mb-8 xs:max-w-[703px] max-w-full xs:leading-[21.94px] leading-[19.5px]">
              У нас есть самые разнообразные объекты размещения — от отелей и
              апартаментов до поездов, переделанных в хостелы, и домов на
              дереве.
            </p>
          </div>
          <div
            id="form_container"
            className="bg-backgr flex rounded-20 min-h-312"
          >
            <div
              id="form_img_box"
              className="lg:max-w-554 md:max-w-554 w-full "
            >
              <Image
                id="form_img"
                src={contactImage2}
                alt={"contact image"}
                className="w-full h-full object-cover lg:rounded-l-20 md:rounded-l-20"
              />
            </div>
            <aside
              id="form_box"
              className="w-full flex justify-center items-center lg:mx-40 md:mx-40"
            >
              <form
                action={async (formData: FormData) => {
                  const response = await createApplicaiton(formData, selectedCategory);
                  if (response.status == 201) {
                    alert("Заявка успешно отправлена!");
                    window.location.reload();
                  } else {
                    alert("Ошибка при отправке заявки!");
                  }
                }}
                className="lg:max-w-540 md:max-w-540 w-full"
              >
                <div
                  id="form_input_box"
                  className="flex justify-between md:gap-2"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    className="lg:max-w-260 w-full text-additional text-xs bg-backgr py-4 px-5 rounded-250 border border-additional_border outline-none"
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Ваш телефон"
                    className="lg:max-w-260 w-full text-additional text-xs bg-backgr py-4 px-5 rounded-250 border border-additional_border outline-none"
                  />
                </div>
                <div
                  id="form_input_box"
                  className="flex justify-between md:gap-2 mt-5"
                >
                  <input
                    type="text"
                    name="city"
                    placeholder="Город"
                    className="lg:max-w-260 w-full text-additional text-xs bg-backgr py-4 px-5 rounded-250 border border-additional_border outline-none"
                  />
                  <CustomSelect
                    type={3}
                    bg="bg-backgr"
                    options={categoryOptions}
                    onChange={handleSelectCategoryChange}
                    customStyle={
                      "lg:max-w-260 w-full border-additional_border text-left"
                    }
                    placeholder="Тип помещения"
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
};

export default About;

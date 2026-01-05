"use client";
import { addProduct } from "@/api/products";
import CustomSelect from "@/components/CustomSelect";
import FlexWrap from "@/components/FlexWrap";
import InsideWidthWrapper from "@/components/InsideWrapper";
import Loading from "@/components/Loading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultProductImage } from "@/imports";
import { ProductInterface } from "@/interfaces";
import { comforts } from "@/lib/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const options = [
  { value: "daily_rent", label: "Посуточная аренда" },
  { value: "monthly_rent", label: "Долгосрочная аренда" },
  // { value: "option3", label: "Продажа" },
];

const currencies = [
  { value: "UZS", label: "UZS" },
  { value: "USD", label: "USD" },
];

const page = () => {
  const router = useRouter();
  const [operationType, setOperationType] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [images, setImages] = useState<Array<any>>([]);
  const [imagesPreview, setImagesPreview] = useState<Array<any>>([]);
  const accessToken = useLocalStorage("", "accessToken");
  const [comforts_special, setComfortsSpecial] = useState<string[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const fullname = useLocalStorage("", "fullname");

  const loadingFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
        }
      };

      setImages((prev) => [...prev, file]);
      reader.readAsDataURL(file);
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setComfortsSpecial((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const handleOperationSelectChange = (value: string) => {
    setOperationType(value);
  };

  const handleCurrencySelectChange = (value: string) => {
    setCurrency(value);
  };

  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper id="inside_wrapper" className="lg:flex-row flex-col">
        <h1
          id="homePage_title"
          // className="text-[20px] leading-[24.38px] font-bold xs:text-[26px] xs:leading-[30.38px] sm:text-[32px] sm:leading-[36px] md:text-[46px] md:leading-[56px] text-white first-letter"
          className="text-46 text-additional font-bold add_title"
        >
          {fullname.split(" ")[0]}, добро пожаловать!
        </h1>
        <p
          id="homePage_subtitle"
          className="text-2xl text-text font-normal mb-12"
        >
          Для начала укажите название и адрес вашего объекта, а также контактные
          данные.
        </p>
        <form
          action={async (formData: FormData) => {
            const imagesData = new FormData();
            formData.append("operation_type", operationType);
            formData.append("currency", currency);
            formData.append(
              "comforts_special",
              JSON.stringify(comforts_special)
            );
            images.forEach((image) => {
              imagesData.append("images", image);
            });
            if (!operationType) {
              return console.log("PLease choose operation type");
            }
            setLoader(true);
            try {
              const response = await addProduct(
                formData,
                accessToken,
                imagesData
              );
              if (response.data) {
                setLoader(false);
                return router.push("/cabinet/my-places");
              }
            } catch (error) {
              setLoader(false);
              console.log("🚀 ~ action={ ~ error:", error);
              return error;
            }
          }}
        >
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 add_form_container">
            <h3 className="text-sm text-additional font-semibold">
              Как называется ваш объект?
            </h3>
            <div className="flex items-center justify-between gap-20 add_inputBox">
              <input
                required
                type="text"
                name="name"
                id=""
                placeholder="Например: Дача 300"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <input
                required
                type="number"
                name="rooms"
                id=""
                placeholder="Колличество комнат"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
            </div>
            <p className="text-sm text-lightBlack font-normal">
              Это название будут видеть гости при поиске варианта проживания.
            </p>
          </div>
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 add_form_container">
            <h3 className="text-sm text-additional font-semibold">
              Какие контактные данные вы хотите указать для этого объекта?
            </h3>
            <div className="flex items-center justify-between gap-20 add_inputBox">
              <input
                required
                type="text"
                name="username"
                id=""
                placeholder="Контактное лицо"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <input
                required
                type="text"
                name="phone"
                id=""
                placeholder="Контактный номер телефона (чтобы мы могли помочь вам с регистрацией)"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
            </div>
          </div>
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 add_form_container">
            <h3 className="text-sm text-additional font-semibold">
              Какое описание вы хотите предоставить для этого объекта?
            </h3>
            <textarea
              placeholder="Добавьте описание"
              name="description"
              id=""
              required
              maxLength={200}
              className="w-full px-20 py-17 rounded-20 mt-6 text-xs text-additional min-h-120 font-normal outline-none"
            ></textarea>
          </div>
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 add_form_container">
            <h3 className="text-sm text-additional font-semibold">
              Где находится ваш объект?
            </h3>
            <div className="flex items-center justify-between gap-20 add_inputBox">
              <input
                required
                type="text"
                name="city"
                id=""
                placeholder="Выберите город"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <input
                required
                type="text"
                name="district"
                id=""
                placeholder="Выберите округ"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <input
                required
                type="text"
                name="street"
                id=""
                placeholder="Улица и номер дома"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
            </div>
            <div className="flex items-center justify-between gap-20 add_location">
              <input
                required
                type="text"
                name="details"
                id=""
                placeholder="Строение, этаж, квартира и т. п."
                className="rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_location_input"
              />
              <div className="flex items-center relative justify-between max-w-575 w-full px-20 add_location_box">
                <div className="w-full absolute items-center flex gap-20 right-0">
                  <input
                    type=""
                    onChange={() => {}}
                    value="Прикрепить локацию"
                    className="bg-secondary cursor-pointer text-base text-white outline-none py-15 text-center px-30 rounded-250 w-260 add_location_btn"
                  />
                  <p className="text-sm text-gray font-normal w-full">
                    нажмите что бы указать метку на карте
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray font-normal mt-6 leading-6">
              Пожалуйста, укажите полный адрес вашего объекта размещения,
              включая номер дома, строения и т. д. <br></br>
              На основе этой информации мы можем выслать бумажное письмо по
              обычной почте для подтверждения этого адреса.
            </p>
          </div>
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 add_form_container">
            <h3 className="text-sm text-additional font-semibold">
              Стоимость и аренда
            </h3>
            <div className="flex items-center justify-between gap-20 add_inputBox">
              <input
                required
                type="text"
                name="amount"
                id=""
                placeholder="Укажите стоимость"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <CustomSelect
                type={3}
                options={currencies}
                onChange={handleCurrencySelectChange}
                placeholder="Выберите валюту"
              />
              <CustomSelect
                type={3}
                options={options}
                onChange={handleOperationSelectChange}
                placeholder="Выберите время прибывания"
              />
            </div>
          </div>
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 add_form_container">
            <h3 className="text-sm text-additional font-semibold mb-5">
              Условия и удобства
            </h3>
            <div className="w-full flex items-center justify-between mb-3 add_checkbox_container">
              {comforts.map((item: any, i: number) => {
                if (i <= comforts.length / 2) {
                  return (
                    <div className="flex add_checkbox_div">
                      <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={comforts_special?.includes(item.value)}
                        value={item.value}
                      />
                      <label className="ml-2 text-xs font-medium text-additional">
                        {item.label}
                      </label>
                    </div>
                  );
                }
              })}
            </div>
            <div className="w-full flex items-center justify-between mb-3 add_checkbox_container">
              {comforts.map((item: any, i: number) => {
                if (i >= comforts.length / 2) {
                  return (
                    <div className="flex add_checkbox_div">
                      <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={comforts_special.includes(item.value)}
                        value={item.value}
                      />
                      <label className="ml-2 text-xs font-medium text-additional">
                        {item.label}
                      </label>
                    </div>
                  );
                }
              })}
            </div>
            <textarea
              placeholder="Добавьте свои удобства через запятую"
              name="additional"
              id=""
              className="w-full px-20 py-17 rounded-20 mt-6 text-xs text-additional min-h-120 font-normal outline-none"
            ></textarea>
          </div>
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 flex justify-between gap-20 add_lastForm add_form_container">
            <div className="max-h-215 flex flex-col justify-between add_photo_box">
              <div className="flex flex-col add_photoBox_col1">
                <h3 className="text-sm text-additional font-semibold mb-5">
                  Фотографии объекта
                </h3>
                <div className="flex add_choose_file items-center gap-20">
                  <input
                    type="file"
                    multiple
                    onChange={loadingFiles}
                    name="chooseImage"
                    id="ImgFile"
                    accept="image/jpeg"
                    className="rounded-250 px-43 py-15 add_choose_file_input"
                  />
                  <label
                    className="py-17 px-50 bg-white text-xs text-additional rounded-250 border border-additional_border cursor-pointer add_choose_file_label"
                    htmlFor="ImgFile"
                  >
                    Прикрепите фото
                  </label>
                  <p className="text-gray text-sm text-left">
                    не более 20 файлов
                  </p>
                </div>
              </div>
              <div className="flex mt-5 gap-5 items-center w-full add_btn_box">
                <button
                  type="submit"
                  className="bg-secondary min-w-176 cursor-pointer text-base font-medium text-white outline-none py-15 px-43 rounded-250 add_save_btn"
                >
                  Сохранить
                </button>

                <button
                  onClick={() => {
                    setImages([]);
                    setImagesPreview([]);
                  }}
                  className="py-15 min-w-231 w-full text-base font-normal text-center border border-primary text-primary rounded-250 add_deleteAll_btn"
                >
                  Удалить все фото
                </button>
              </div>
            </div>
            <div className="w-full max-w-715 h-full bg-white rounded-20 p-20 min-h-215 add_imgContainer">
              <FlexWrap className="justify-start gap-2">
                {imagesPreview?.map((img, i) => (
                  <div key={i} className="w-80 h-80 rounded-10">
                    <Image
                      width={1000}
                      height={1000}
                      src={img}
                      alt={"product image"}
                      className="w-full h-full object-cover rounded-10"
                    />
                  </div>
                ))}
              </FlexWrap>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary mt-12 cursor-pointer text-base text-white outline-none py-15 w-full rounded-250"
          >
            {loader ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loading type={2} />
              </div>
            ) : (
              "Создать"
            )}
          </button>
        </form>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default page;

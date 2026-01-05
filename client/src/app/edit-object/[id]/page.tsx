"use client";
import {
  fetchMyProduct,
  fetchMyProducts,
  updateMyProduct,
} from "@/api/products";
import CustomImage from "@/components/CustomImage";
import CustomSelect from "@/components/CustomSelect";
import FlexWrap from "@/components/FlexWrap";
import InsideWidthWrapper from "@/components/InsideWrapper";
import Loading from "@/components/Loading";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { close } from "@/imports";
import { ProductInterface } from "@/interfaces";
import { comforts } from "@/lib/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const currencies = [
  { value: "UZS", label: "UZS" },
  { value: "USD", label: "USD" },
];

const options = [
  { value: "daily_rent", label: "Посуточная аренда" },
  { value: "monthly_rent", label: "Долгосрочная аренда" },
  // { value: "option3", label: "Продажа" },
];

const page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const accessToken = useLocalStorage("", "accessToken");
  const [images, setImages] = useState<Array<any>>([]);
  const [deletingImages, setDeletingImages] = useState<Array<any>>([]);
  const [imagesPreview, setImagesPreview] = useState<Array<any>>([]);
  const [formValues, setFormValues] = useState<ProductInterface | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchMyProduct(params.id as string);
        setProduct(response?.data ?? null); // Assuming response.data holds the product data
        setFormValues(response?.data ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        return <div>Loading...</div>; // Stop loading after the fetch completes (success or error)
      }
    };

    getProduct();
  }, [params.id]);
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

  const handleDeleteImage = (img?: any) => {
    if (img.path) {
      setFormValues((prevValues) => ({
        ...prevValues!,
        images: prevValues!.images.filter((image) => image.path !== img.path),
      }));
      setDeletingImages((prev) => [...prev, img.path]);
    } else if (typeof img == "number") {
      setImagesPreview((prev) => prev.filter((_, i) => i !== img)); // Update image previews
      setImages((prev) => prev.filter((_, i) => i !== img));
    } else {
      const allDeletingImgs: any = [];
      // Fill the emptyArray with the path properties from the objects of firstArray
      formValues?.images.forEach((obj) => {
        allDeletingImgs.push(obj.path);
      });
      setFormValues((prevValues) => ({
        ...prevValues!,
        images: [],
      }));
      setDeletingImages(allDeletingImgs);
      setImages([]), setImagesPreview([]);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formValues) {
      const { name, value } = e.target;

      // Split the name by dot notation (for example: "contact.username")
      const nameParts = name.split(".");

      // Copy the current form values
      let newFormValues: any = { ...formValues };
      let field = newFormValues;

      // Traverse the name parts to update the nested value
      for (let i = 0; i < nameParts.length - 1; i++) {
        field = field[nameParts[i]];
      }

      // Update the final property in the path
      field[nameParts[nameParts.length - 1]] = value;

      // Set the updated form values
      setFormValues({ ...newFormValues });
    }
  };
  

  // Handle checkpoints (checkboxes)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (formValues) {
      let updatedSpecial: string[];

      if (checked) {
        // Add the value if checked
        updatedSpecial = [...(formValues?.comforts?.special || []), value];
      } else {
        // Remove the value if unchecked
        updatedSpecial =
          formValues?.comforts?.special?.filter((item) => item !== value) || [];
      }

      setFormValues((prevFormValues) => ({
        ...prevFormValues!,
        comforts: {
          ...prevFormValues?.comforts,
          special: updatedSpecial,
        },
      }));
    }
  };

  const handleOperationSelectChange = (value: string) => {
    if (formValues) {
      setFormValues({
        ...formValues,
        operation_type: value,
      });
    }
  };

  const handleCurrencySelectChange = (value: string) => {
    if (formValues) {
      setFormValues({
        ...formValues,
        price: {
          amount: formValues?.price?.amount,
          currency: value,
        },
      });
    }
  };

  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper id="inside_wrapper" className="lg:flex-row flex-col">
        <h1 id="homePage_title" className="text-46 text-additional add_title">
          <strong>Частный дом:</strong> {product?.name}
        </h1>
        <p
          id="homePage_subtitle"
          // className="text-[20px] leading-[24.38px] font-bold xs:text-[26px] xs:leading-[30.38px] sm:text-[32px] sm:leading-[36px] md:text-[46px] md:leading-[56px] text-white first-letter"
          className="text-2xl text-text font-normal mb-12"
        >
          Измените свой объект и нажмите сохранить
        </p>
        <form
          action={async () => {
            const imagesData = new FormData();
            images.forEach((image) => {
              imagesData.append("images", image);
            });

            setLoader(true);
            try {
              const product = await updateMyProduct(
                params.id,
                accessToken,
                formValues,
                imagesData,
                deletingImages
              );
              if (product) {
                setLoader(false);
                router.push("/cabinet/my-places");
              }
            } catch (error) {
              setLoader(false);
              console.error(error);
            }
          }}
        >
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 add_form_container">
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-additional font-semibold">
                Как называется ваш объект?
              </h3>
              <h3 className="text-sm text-additional font-semibold isEmpty_h3">
                Свободен ли объект?
              </h3>
            </div>
            <div className="my-6 flex w-full justify-between items-center gap-20 edit_name_input_box">
              <div className="flex items-center gap-[20px] w-full">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formValues?.name}
                  onChange={handleChange}
                  placeholder="Например: Дача 300"
                  className="rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575"
                />
                <input
                  required
                  type="number"
                  name="rooms"
                  id=""
                  value={formValues?.rooms}
                  onChange={handleChange}
                  placeholder="Колличество комнат"
                  className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-[200px] add_input"
                />
              </div>
              <p className="text-sm text-lightBlack font-normal hidden edit_name_p_hidden">
                Это название будут видеть гости при поиске варианта проживания.
              </p>
              <h3 className="hidden mt-20 text-sm text-additional font-semibold isEmpty_h3_hidden">
                Свободен ли объект?
              </h3>
              <div className="flex rounded-250">
                <input
                  type="radio"
                  name="isEmpty"
                  id="yes"
                  className="hidden"
                  defaultChecked
                />
                <label
                  htmlFor="yes"
                  className="edit_isEmpty_label1 edit_isEmpty_label py-13 px-30 rounded-l-250"
                >
                  Да
                </label>
                <input type="radio" name="isEmpty" id="no" className="hidden" />
                <label
                  htmlFor="no"
                  className="edit_isEmpty_label2 edit_isEmpty_label py-13 px-30 rounded-r-250"
                >
                  Нет
                </label>
              </div>
            </div>
            <p className="text-sm text-lightBlack font-normal edit_name_p">
              Это название будут видеть гости при поиске варианта проживания.
            </p>
          </div>
          <div className="w-full rounded-20 bg-backgr py-9 px-12 mt-9 add_form_container">
            <h3 className="text-sm text-additional font-semibold">
              Какие контактные данные вы хотите указать для этого объекта?
            </h3>
            <div className="flex items-center justify-between gap-20 add_inputBox">
              <input
                type="text"
                name="contact.username"
                id="username"
                value={formValues?.contact.username}
                onChange={handleChange}
                placeholder="Контактное лицо"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <input
                type="text"
                name="contact.phone"
                id="phone"
                value={formValues?.contact.phone}
                onChange={handleChange}
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
              value={formValues?.description}
              onChange={handleChange}
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
                type="text"
                value={formValues?.address.city}
                onChange={handleChange}
                name="address.city"
                id="city"
                placeholder="Выберите город"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <input
                type="text"
                value={formValues?.address.district}
                onChange={handleChange}
                name="address.district"
                id="district"
                placeholder="Выберите округ"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <input
                type="text"
                value={formValues?.address.street}
                onChange={handleChange}
                name="address.street"
                id="street"
                placeholder="Улица и номер дома"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
            </div>
            <div className="flex items-center justify-between gap-20 add_location">
              <input
                type="text"
                value={formValues?.address.details}
                onChange={handleChange}
                name="address.details"
                id="details"
                placeholder="Строение, этаж, квартира и т. п."
                className="rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_location_input"
              />
              <div className="flex items-center relative justify-between max-w-575 w-full px-20 add_location_box">
                <div className="w-full absolute items-center flex gap-20 right-0">
                  <input
                    type="submit"
                    value="Прикрепить локацию"
                    className="bg-additional cursor-pointer text-base text-white outline-none py-15 px-30 text-center rounded-250 w-260 add_location_btn"
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
                value={formValues?.price.amount}
                onChange={handleChange}
                name="price.amount"
                id=""
                placeholder="Укажите стоимость"
                className="my-6 rounded-250 outline-none border border-border text-additional text-xs font-normal py-17 px-20 w-full max-w-575 add_input"
              />
              <CustomSelect
                type={3}
                options={currencies}
                initialValue={formValues?.price.currency}
                onChange={handleCurrencySelectChange}
                placeholder="Выберите валюту"
              />
              <CustomSelect
                type={3}
                options={options}
                initialValue={formValues?.operation_type}
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
                        checked={formValues?.comforts?.special?.includes(
                          item.value
                        )}
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
                        checked={formValues?.comforts?.special?.includes(
                          item.value
                        )}
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
              name="comforts.additional"
              value={formValues?.comforts.additional}
              onChange={handleChange}
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
                  // type="submit"
                  className="bg-additional min-w-176 cursor-pointer text-base font-medium text-white outline-none py-15 px-43 rounded-250 add_save_btn"
                >
                  Сохранить
                </button>

                <span
                  onClick={handleDeleteImage}
                  className="cursor-pointer py-15 min-w-231 w-full text-base font-normal text-center border border-primary text-primary rounded-250 add_deleteAll_btn"
                >
                  Удалить все фото
                </span>
              </div>
            </div>
            <div className="w-full max-w-715 h-full bg-white rounded-20 p-20 min-h-215 add_imgContainer">
              <FlexWrap className="justify-start gap-[8px]">
                {formValues?.images?.map((img, i) => (
                  <div key={i} className="w-80 h-80 rounded-10 relative">
                    <span
                      onClick={() => handleDeleteImage(img)}
                      className="rounded-1/2 absolute top-[-7px] right-[-7px] flex cursor-pointer items-center justify-center w-[16px] h-[16px] bg-[#F77219]"
                    >
                      <CustomImage image={close} alt="" style="max-w-[6px]" />
                    </span>
                    <Image
                      width={1000}
                      height={1000}
                      src={img.uri}
                      alt={"product image"}
                      className="w-full h-full object-cover rounded-10"
                    />
                  </div>
                ))}
                {imagesPreview?.map((img, i) => (
                  <div key={i} className="w-80 h-80 rounded-10 relative">
                    <span
                      onClick={() => handleDeleteImage(i)}
                      className="rounded-1/2 absolute top-[-7px] right-[-7px] flex cursor-pointer items-center justify-center w-[16px] h-[16px] bg-[#F77219]"
                    >
                      <CustomImage image={close} alt="" style="max-w-[6px]" />
                    </span>
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
              "Сохранить изменения"
            )}
          </button>
        </form>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default page;

"use client";
import { fetchMyProduct, updateMyProduct } from "@/api/products";
import CustomSelect from "@/components/CustomSelect";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
// import Loading from "@/components/Loading";
// import { useLocalStorage } from "@/hooks/useLocalStorage";
// import { close } from "@/imports";
import { ProductInterface } from "@/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const comforts: any = [
  {
    label: "Телевизор",
    value: "Tv",
  },
  {
    label: "Бесплатный Wi-Fi",
    value: "Free Wifi",
  },
  {
    label: "Бассейн",
    value: "Swimming pool",
  },
  {
    label: "Ванные комнаты",
    value: "Extra bathroom",
  },
  {
    label: "Кондиционер",
    value: "Air condition",
  },
  {
    label: "Холодильник",
    value: "Fridge",
  },
  {
    label: "Бассейн",
    value: "Swimming pool",
  },
  {
    label: "Ванные комнаты",
    value: "Extra bathroom",
  },
  {
    label: "Мангал",
    value: "Barbecue",
  },
  {
    label: "Мангал",
    value: "Barbecue",
  },
];

const EditProduct: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const [product, setProduct] = useState<ProductInterface | null>(null);
  // const accessToken = useLocalStorage("", "accessToken");
  const [deletingImages, setDeletingImages] = useState<Array<any>>([]);
  const [images, setImages] = useState<Array<any>>([]);
  const [imagesPreview, setImagesPreview] = useState<Array<any>>([]);
  const [formValues, setFormValues] = useState<ProductInterface | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    setToken(token);
  }, []);

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
      setFormValues((prevValues: any) => ({
        ...prevValues!,
        images: prevValues!.images.filter(
          (image: any) => image.path !== img.path,
        ),
      }));
      setDeletingImages((prev) => [...prev, img.path]);
    } else if (typeof img == "number") {
      setImagesPreview((prev) => prev.filter((_, i) => i !== img)); // Update image previews
      setImages((prev) => prev.filter((_, i) => i !== img));
    } else {
      const allDeletingImgs: any = [];
      // Fill the emptyArray with the path properties from the objects of firstArray
      formValues?.images.forEach((obj: any) => {
        allDeletingImgs.push(obj.path);
      });
      setFormValues((prevValues: any) => ({
        ...prevValues!,
        images: [],
      }));
      setDeletingImages(allDeletingImgs);
      setImages([]), setImagesPreview([]);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
  const options = [
    { value: "daily_rent", label: "Посуточная аренда" },
    { value: "monthly_rent", label: "Долгосрочная аренда" },
    // { value: "option3", label: "Продажа" },
  ];

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
          formValues?.comforts?.special?.filter(
            (item: any) => item !== value,
          ) || [];
      }

      setFormValues((prevFormValues: any) => ({
        ...prevFormValues!,
        comforts: {
          ...prevFormValues?.comforts,
          special: updatedSpecial,
        },
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    if (formValues) {
      setFormValues({
        ...formValues,
        operation_type: value,
      });
    }
  };

  return (
    <DefaultLayout>
      <div className="sm:px-[15px] xl:px-[70px]">
        <h1 className="text-46 add_title text-white">
          <strong>Частный дом:</strong> {product?.name}
        </h1>
        <p
          id="homePage_subtitle"
          // className="text-[20px] leading-[24.38px] font-bold xs:text-[26px] xs:leading-[30.38px] sm:text-[32px] sm:leading-[36px] md:text-[46px] md:leading-[56px] text-white first-letter"
          className="mb-12 text-2xl font-normal text-white"
        >
          Измените объект и нажмите сохранить
        </p>
        <form
          className=""
          action={async (formData: FormData) => {
            const imagesData = new FormData();
            images.forEach((image) => {
              imagesData.append("images", image);
            });
            setLoader(true);
            try {
              const product = await updateMyProduct(
                params.id,
                token,
                formValues,
                imagesData,
                deletingImages,
              );
              if (product) {
                setLoader(false);
                router.push("/products");
              }
            } catch (error) {
              setLoader(false);
              console.error(error);
            }
          }}
        >
          <div className="add_form_container mt-9 w-full rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">
                Как называется ваш объект?
              </h3>
              <h3 className="hidden text-sm font-semibold text-white md:inline-block">
                Свободен ли объект?
              </h3>
            </div>
            <div className="edit_name_input_box mt-[24px] flex w-full flex-col items-start justify-between gap-[20px] md:my-[24px] md:flex-row md:items-center">
              <div className="flex w-full flex-col items-center gap-[12px] xs:flex-row xs:gap-[20px]">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formValues?.name}
                  onChange={handleChange}
                  placeholder="Например: Дача 300"
                  className="border-border w-full max-w-[575px] rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
                />
                <input
                  required
                  type="number"
                  name="rooms"
                  id=""
                  value={formValues?.rooms}
                  onChange={handleChange}
                  placeholder="Колличество комнат"
                  className="border-border w-full rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px] md:max-w-[200px]"
                />
              </div>
              <p className="edit_name_p_hidden text-sm font-normal text-white md:hidden">
                Это название будут видеть гости при поиске варианта проживания.
              </p>
              <h3 className="isEmpty_h3_hidden mt-[10px] text-sm font-semibold text-white md:hidden">
                Свободен ли объект?
              </h3>
              <div className="flex rounded-[250px]">
                <input
                  type="radio"
                  name="isEmpty"
                  id="yes"
                  className="hidden"
                  defaultChecked
                />
                <label
                  htmlFor="yes"
                  className="edit_isEmpty_label1 edit_isEmpty_label cursor-pointer rounded-l-[250px] bg-white px-[30px] py-[13px] text-sm text-dark sm:text-base"
                >
                  Да
                </label>
                <input type="radio" name="isEmpty" id="no" className="hidden" />
                <label
                  htmlFor="no"
                  className="edit_isEmpty_label2 edit_isEmpty_label cursor-pointer rounded-r-[250px] bg-white px-[30px] py-[13px] text-sm text-dark sm:text-base"
                >
                  Нет
                </label>
              </div>
            </div>
            <p className="hidden text-sm font-normal text-white md:inline-block">
              Это название будут видеть гости при поиске варианта проживания.
            </p>
          </div>
          <div className="add_form_container mt-9 w-full rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <h3 className="text-sm font-semibold text-white">
              Какие контактные данные вы хотите указать для этого объекта?
            </h3>
            <div className="mt-6 flex flex-col items-center justify-center gap-[12px] xs:flex-row xs:justify-between xs:gap-[20px]">
              <input
                type="text"
                name="contact.username"
                id="username"
                value={formValues?.contact.username}
                onChange={handleChange}
                placeholder="Контактное лицо"
                className="border-border add_input w-full max-w-[575px] rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
              />
              <input
                type="text"
                name="contact.phone"
                id="phone"
                value={formValues?.contact.phone}
                onChange={handleChange}
                placeholder="Контактный номер телефона (чтобы мы могли помочь вам с регистрацией)"
                className="border-border add_input w-full max-w-[575px] rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
              />
            </div>
          </div>
          <div className="add_form_container mt-9 w-full rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <h3 className="text-sm font-semibold text-white">
              Какое описание вы хотите предоставить для этого объекта?
            </h3>
            <textarea
              placeholder="Добавьте описание"
              name="description"
              id=""
              value={formValues?.description}
              onChange={handleChange}
              maxLength={200}
              className="mt-6 min-h-[120px] w-full rounded-[20px] px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
            ></textarea>
          </div>
          <div className="add_form_container mt-9 w-full rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <h3 className="text-sm font-semibold text-white">
              Где находится ваш объект?
            </h3>
            <div className="mb-[12px] mt-6 flex flex-col items-center justify-between gap-[12px] xs:flex-row sm:gap-[20px] md:my-6">
              <input
                type="text"
                value={formValues?.address.city}
                onChange={handleChange}
                name="address.city"
                id="city"
                placeholder="Выберите город"
                className="border-border add_input w-full max-w-[575px] rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
              />
              <input
                type="text"
                value={formValues?.address.district}
                onChange={handleChange}
                name="address.district"
                id="district"
                placeholder="Выберите округ"
                className="border-border add_input w-full max-w-[575px] rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
              />
              <input
                type="text"
                value={formValues?.address.street}
                onChange={handleChange}
                name="address.street"
                id="street"
                placeholder="Улица и номер дома"
                className="border-border add_input x w-full max-w-[575px] rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
              />
            </div>
            <div className="add_location flex flex-col items-start justify-between gap-[12px] md:flex-row md:items-center md:gap-[20px]">
              <input
                type="text"
                value={formValues?.address.details}
                onChange={handleChange}
                name="address.details"
                id="details"
                placeholder="Строение, этаж, квартира и т. п."
                className="border-border add_location_input w-full max-w-[575px] rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
              />
              <div className="flex w-full max-w-[575px] items-center justify-between">
                <div className="right-0 flex w-full items-center gap-[20px]">
                  <input
                    type="submit"
                    value="Прикрепить локацию"
                    className="add_location_btn w-full cursor-pointer rounded-[250px] border-gray-6 bg-gray-7 px-[30px] py-[15px] text-center text-xs text-white outline-none xs:w-auto sm:text-base"
                  />
                  <p className="hidden w-full text-sm font-normal text-gray xs:inline-block">
                    нажмите что бы указать метку на карте
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-6 text-xs font-normal leading-6 text-gray xs:text-sm">
              Пожалуйста, укажите полный адрес вашего объекта размещения,
              включая номер дома, строения и т. д. <br></br>
              На основе этой информации мы можем выслать бумажное письмо по
              обычной почте для подтверждения этого адреса.
            </p>
          </div>
          <div className="add_form_container mt-9 w-full rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <h3 className="text-sm font-semibold text-white">
              Стоимость и аренда
            </h3>
            <div className="mt-6 flex flex-col items-center justify-between gap-[12px] xs:flex-row xs:gap-[20px]">
              <input
                required
                type="text"
                value={formValues?.price.amount}
                onChange={handleChange}
                name="price.amount"
                id=""
                placeholder="Укажите стоимость"
                className="border-border add_input w-full max-w-[575px] rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:px-[20px] sm:py-[17px]"
              />
              <CustomSelect
                type={2}
                options={options}
                initialValue={formValues?.operation_type}
                onChange={handleSelectChange}
                placeholder="Выберите время прибывания"
              />
            </div>
          </div>
          <div className="add_form_container mt-9 w-full rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <h3 className="mb-5 text-sm font-semibold text-white">
              Условия и удобства
            </h3>
            <div className="add_checkbox_container grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4">
              {comforts.map((item: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="add_checkbox_div col-span-1 mb-[14px] flex items-center gap-[4px] xs:gap-[8px]"
                  >
                    <input
                      type="checkbox"
                      onChange={handleCheckboxChange}
                      checked={formValues?.comforts?.special?.includes(
                        item.value,
                      )}
                      value={item.value}
                    />
                    <label className="text-xs font-medium text-white">
                      {item.label}
                    </label>
                  </div>
                );
              })}
            </div>
            {/* <div className="add_checkbox_container flex flex-wrap gap-[20px] mb-[20px] w-full items-center justify-start sm:justify-between">
              {comforts.map((item: any, i: number) => {
                if (i >= comforts.length / 2) {
                  return (
                    <div key={i} className="add_checkbox_div flex">
                      <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={formValues?.comforts?.special?.includes(
                          item.value,
                        )}
                        value={item.value}
                      />
                      <label className="ml-2 text-xs font-medium text-white">
                        {item.label}
                      </label>
                    </div>
                  );
                }
              })}
            </div> */}
            <textarea
              placeholder="Добавьте свои удобства через запятую"
              name="comforts.additional"
              value={formValues?.comforts.additional}
              onChange={handleChange}
              id=""
              className="text-dark-2 mt-6 min-h-[120px] w-full rounded-[20px] px-[15px] py-[12px] text-xs font-normal outline-none sm:px-[20px] sm:py-[17px]"
            ></textarea>
          </div>
          <div className="mt-9 flex w-full flex-col justify-between gap-[20px] rounded-[20px] border border-stroke bg-white px-[16px] py-[12px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] md:flex-row xl:px-[48px] xl:py-[36px]">
            <div className="flex min-h-[215px] flex-col justify-between">
              <div className="flex flex-col">
                <h3 className="mb-[20px] text-sm font-semibold text-white">
                  Фотографии объекта
                </h3>
                <div className="add_choose_file flex flex-col items-start gap-[12px] xs:flex-row xs:items-center xs:gap-[20px]">
                  <input
                    type="file"
                    multiple
                    onChange={loadingFiles}
                    name="chooseImage"
                    id="ImgFile"
                    accept="image/jpeg"
                    className="add_choose_file_input hidden rounded-[250px] px-[43px] py-[15px]"
                  />
                  <label
                    className="border-additional_border w-full cursor-pointer rounded-[250px] border bg-white py-[14px] text-center text-sm text-dark-2 xs:w-[188px] xs:py-[17px]"
                    htmlFor="ImgFile"
                  >
                    Прикрепите фото
                  </label>
                  <p className="text-left text-sm text-gray">
                    не более 20 файлов
                  </p>
                </div>
              </div>
              <div className="add_btn_box mt-[20px] flex flex-col items-center gap-[12px] xs:flex-row xs:gap-[20px]">
                <button
                  // type="submit"
                  className="add_save_btn w-full cursor-pointer rounded-[250px] border border-gray-6 bg-gray-7 py-[12px] text-sm font-medium text-white outline-none xs:w-[130px] xs:py-[15px] xl:w-[176px] xl:text-base"
                >
                  Сохранить
                </button>

                <span
                  onClick={handleDeleteImage}
                  className="w-full cursor-pointer rounded-[250px] border border-primary py-[12px] text-center text-sm font-normal text-primary xs:w-[160px] xs:py-[15px] xl:w-[231px] xl:text-base"
                >
                  Удалить все фото
                </span>
              </div>
            </div>
            <div className="flex h-full min-h-[215px] w-full rounded-[20px] bg-white p-[20px]">
              <div className="flex flex-wrap justify-start gap-[8px]">
                {formValues?.images?.map((img: any, i: number) => (
                  <div
                    key={i}
                    className="relative h-[70px] w-[70px] rounded-[10px] xl:h-[80px] xl:w-[80px]"
                  >
                    <span
                      onClick={() => handleDeleteImage(img)}
                      className="absolute right-[-7px] top-[-7px] flex h-[16px] w-[16px] cursor-pointer items-center justify-center rounded-full bg-[#F77219]"
                    >
                      {/* <CustomImage image={close} alt="" style="max-w-[6px]" /> */}
                    </span>
                    <Image
                      width={1000}
                      height={1000}
                      src={img.uri}
                      alt={"product image"}
                      className="h-full w-full rounded-[10px] object-cover"
                    />
                  </div>
                ))}
                {imagesPreview?.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-[70px] w-[70px] rounded-[10px] xl:h-[80px] xl:w-[80px]"
                  >
                    <span
                      onClick={() => handleDeleteImage(i)}
                      className="absolute right-[-7px] top-[-7px] flex h-[16px] w-[16px] cursor-pointer items-center justify-center rounded-full bg-[#F77219]"
                    >
                      {/* <CustomImage image={close} alt="" style="max-w-[6px]" /> */}
                    </span>
                    <Image
                      width={1000}
                      height={1000}
                      src={img}
                      alt={"product image"}
                      className="h-full w-full rounded-[10px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-12 w-full cursor-pointer rounded-[250px] bg-primary py-[15px] text-base text-white outline-none"
          >
            {loader ? (
              <div className="flex h-full w-full items-center justify-center">
                {/* <Loading type={2} /> */}
                ...
              </div>
            ) : (
              "Сохранить изменения"
            )}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditProduct;

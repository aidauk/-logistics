"use client";
import { fetchSingleNews, updateSingleNews } from "@/api/news";
import { fetchUser, updateUser } from "@/api/users";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomSelect from "@/components/CustomSelect";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { NewsInterface, UserInterface } from "@/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const UserEdit: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const [inputValues, setInputValues] = useState<NewsInterface>({
    title: "",
    description: "",
    createdAt: new Date(),
    _id: "",
    images: [],
  });
  const [data, setData] = useState<NewsInterface>({} as NewsInterface);
  const [token, setToken] = useState<string | null>(null);
  const [images, setImages] = useState<Array<any>>([]);
  const [deletingImages, setDeletingImages] = useState<Array<any>>([]);
  const [imagesPreview, setImagesPreview] = useState<Array<any>>([]);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    setToken(token);
    const fetchData = async () => {
      try {
        const data = await fetchSingleNews(params.id);
        setData(data);
        setInputValues({
          title: data.title || "",
          description: data.description || "",
          createdAt: data.createdAt || new Date(),
          _id: data._id || "",
          images: data.images || [],
        });
      } catch (err: any) {
        console.error("Error fetching news data:", err.message);
      }
    };

    fetchData();
  }, []);

  // Handle input change with proper key type
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: any,
  ) => {
    setInputValues({
      ...inputValues,
      [key]: e.target.value, // Ensure proper typing for the value
    });
    console.log(3);
  };

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
      setInputValues((prevValues: any) => ({
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
      inputValues?.images.forEach((obj: any) => {
        allDeletingImgs.push(obj.path);
      });
      setInputValues((prevValues: any) => ({
        ...prevValues!,
        images: [],
      }));
      setDeletingImages(allDeletingImgs);
      setImages([]), setImagesPreview([]);
    }
  };

  const getChangedValues = (): Partial<NewsInterface> => {
    const changedValues: Partial<NewsInterface> = {};

    for (const key in inputValues) {
      if (
        inputValues.hasOwnProperty(key) &&
        inputValues[key as keyof NewsInterface] !==
          data[key as keyof NewsInterface]
      ) {
        changedValues[key] = inputValues[key as keyof NewsInterface];
      }
    }

    return changedValues;
  };

  const updateNewsData = async () => {
    const imagesData = new FormData();
    images.forEach((image) => {
      imagesData.append("images", image);
    });
    setLoader(true);
    try {
      const news = await updateSingleNews(
        params.id,
        token,
        inputValues,
        imagesData,
        deletingImages,
      );
      if (news) {
        setLoader(false);
        router.push("/news");
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users / Edit" />
      <form className="flex justify-center">
        <div className="w-fit flex-col items-center">
          <div className="flex w-fit flex-col gap-[20px] rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <div className="flex flex-col justify-center">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={inputValues.title}
                onChange={(e) => handleInputChange(e, "title")}
                placeholder="Например: Дача 300"
                className="border-border mt-[10px] w-full rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark-2 outline-none sm:min-w-[475px] sm:px-[20px] sm:py-[17px]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={inputValues.description}
                onChange={(e) => handleInputChange(e, "description")}
                placeholder="Например: Дача 300"
                className="text-dark-2 mt-6 min-h-[120px] w-full rounded-[20px] px-[15px] py-[12px] text-xs font-normal outline-none sm:px-[20px] sm:py-[17px]"
              ></textarea>
            </div>
            <div className="mb-[40px] flex h-fit w-full rounded-[20px] bg-white p-[20px]">
              <div className="flex flex-wrap justify-start gap-[8px]">
                {inputValues?.images?.map((img: any, i: number) => (
                  <div
                    key={i}
                    className="relative h-[70px] w-[70px] rounded-[10px] xl:h-[80px] xl:w-[80px]"
                  >
                    <span
                      onClick={() => handleDeleteImage(img)}
                      className="absolute right-[-7px] top-[-7px] flex h-[16px] w-[16px] cursor-pointer items-center justify-center rounded-full bg-[#F77219]"
                    ></span>
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
                className="border-additional_border w-full cursor-pointer rounded-[250px] border border-gray-6 bg-gray-7 py-[14px] text-center text-sm text-white xs:w-[188px] xs:py-[17px]"
                htmlFor="ImgFile"
              >
                Прикрепите фото
              </label>
              <p className="text-left text-sm text-gray">не более 15 файлов</p>
            </div>
          </div>
          <button
            onClick={updateNewsData}
            type="submit"
            className="mt-[20px] w-full cursor-pointer rounded-[250px] bg-primary py-[15px] text-base text-white outline-none"
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
        </div>
      </form>
    </DefaultLayout>
  );
};

export default UserEdit;

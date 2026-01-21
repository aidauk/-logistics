"use client";
import { createNews, fetchSingleNews, updateSingleNews } from "@/api/news";
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
  const [token, setToken] = useState<string | null>(null);
  const [images, setImages] = useState<Array<any>>([]);
  const [imagesPreview, setImagesPreview] = useState<Array<any>>([]);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    setToken(token);
  }, []);

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
  const handleDeleteImage = (index?: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index)); // Update image previews
    setImagesPreview((prev) => prev.filter((_, i) => i !== index)); // Update image previews
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users / Edit" />
      <form
        action={async (formData) => {
          const imagesData = new FormData();
          images.forEach((image) => {
            imagesData.append("images", image);
          });
          setLoader(true);
          try {
            const news = await createNews(token, formData, imagesData);
            if (news) {
              setLoader(false);
              router.push("/news");
            }
          } catch (error) {
            setLoader(false);
            console.error(error);
          }
        }}
        className="flex justify-center"
      >
        <div className="w-fit flex-col items-center">
          <div className="flex w-fit flex-col gap-[20px] rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <div className="flex flex-col justify-center">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Например: Дача 300"
                className="border-border mt-[10px] w-full rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark-2 outline-none sm:min-w-[475px] sm:px-[20px] sm:py-[17px]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                placeholder="Например: Дача 300"
                className="mt-6 min-h-[120px] w-full rounded-[20px] px-[15px] py-[12px] text-xs font-normal text-dark-2 outline-none sm:px-[20px] sm:py-[17px]"
              ></textarea>
            </div>
            <div className="mb-[40px] flex h-fit w-full rounded-[20px] bg-white p-[20px]">
              <div className="flex flex-wrap justify-start gap-[8px]">
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

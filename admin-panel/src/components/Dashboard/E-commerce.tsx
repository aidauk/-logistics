"use client";
import React, { useEffect, useState } from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import Image from "next/image";
import defaultImage from "../../../public/images/default-featured-image.jpg";
import ButtonDefault from "../Buttons/ButtonDefault";
import {
  deleteMainImage,
  fetchSeoData,
  updateSeoData,
  uploadMainImage,
} from "@/api/seoData";
import { SeoDataInterface } from "@/interfaces";

const Dashboard: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]); // State to store the array of tags
  const [inputTagsValue, setInputTagsValue] = useState<string>(""); // State to store the input value
  const [token, setToken] = useState<string | null>(null);
  const [seoData, setSeoData] = useState<SeoDataInterface | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [imagePreview, setImagePreview] = useState<any>(
    `${"http://localhost:8063/main-image/main.jpg"}?timestamp=${new Date().getTime()}`,
  );

  // Function to handle input change
  const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTagsValue(e.target.value);
  };

  // Function to add a tag to the array
  const handleAddTag = () => {
    if (inputTagsValue.trim() !== "" && !tags.includes(inputTagsValue)) {
      setTags([...tags, inputTagsValue]); // Add the input value to the tags array
      setInputTagsValue(""); // Clear the input field
    }
  };

  // Function to remove a tag by index
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index)); // Filter out the tag at the given index
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value); // Update the state with the input value
  };

  console.log(inputValue);

  // ----------------------------------------------------------------

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
    const getData = async () => {
      const data = await fetchSeoData();
      setSeoData(data ?? null);
      setTags(data?.keywords ?? []);
      setInputValue(data?.description ?? "");
    };
    getData();
  }, []);

  const loadingFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagePreview(reader.result);
        }
      };

      setImage(selectedFile);
      reader.readAsDataURL(selectedFile);
    } else {
      return;
    }
  };

  console.log("🚀 ~ uploadImage ~ image:", image);
  console.log("🚀 ~ uploadImage ~ image:", imagePreview);
  const uploadImage = async () => {
    const imageData = new FormData();
    imageData.append("image", image);
    try {
      const deleteResponse = await deleteMainImage(token);
      if (deleteResponse?.status == 200) {
        const uploadResponse = await uploadMainImage(token, imageData);
        if (uploadResponse?.status == 201) {
          window.alert("Image uploaded successfully!");
          window.location.reload();
        } else {
          window.alert("Image upload failed.");
        }
      } else {
        window.alert("Something went wrong while deleting the current image!");
      }
    } catch (error) {
      console.error(error);
      window.alert("An error occurred during the image update process.");
    }
  };

  return (
    <>
      <DataStatsOne />

      <h1 className="mt-[40px] text-[28px] font-bold leading-[30px] text-dark dark:text-white">
        Essential Changes
      </h1>
      <div className="grid grid-cols-1 gap-[20px] xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-8">
        <div className="relative col-span-2 mt-[20px] rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="relative z-0 h-[200px] w-full overflow-hidden rounded-t-[10px]">
            <Image
              className="he-full w-full rounded-t-[10px] object-cover"
              src={imagePreview}
              alt="default-image"
              fill
            />
          </div>
          <div className="px-4 py-[15px] sm:px-5.5 sm:py-[20px]">
            <h4 className="text-left font-medium text-dark dark:text-white">
              Main background image
            </h4>
            <div className="add_choose_file mt-[20px] flex flex-wrap items-center gap-[12px] xs:flex-row xs:items-center xs:gap-[20px]">
              <input
                type="file"
                onChange={loadingFile}
                name="chooseImage"
                id="ImgFile"
                accept="image/jpeg"
                className="add_choose_file_input hidden rounded-[250px] px-[43px] py-[15px]"
              />
              <label
                className="cursor-pointer rounded-[5px] border border-gray-6 bg-gray-7 px-10 py-[10px] text-white lg:px-8 xl:px-10"
                htmlFor="ImgFile"
              >
                Select
              </label>
              <ButtonDefault
                onClick={uploadImage}
                label="Upload"
                link="/"
                customClasses=" cursor-pointer rounded-[5px] bg-primary px-10 py-[10px] text-white lg:px-8 xl:px-10"
              />
            </div>
          </div>
        </div>
        <div className="relative col-span-3 mt-[20px] flex flex-col items-start justify-between rounded-[10px] border border-stroke bg-white px-4 py-[12px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-7.5 sm:py-[16px]">
          <div className="flex h-full w-full flex-col gap-[20px]">
            <h4 className="text-left font-medium text-dark dark:text-white">
              Description
            </h4>
            <textarea
              value={inputValue}
              onChange={handleOnChange}
              placeholder="Write about Dachilla.."
              className="h-full max-h-[150px] min-h-[100px] w-full rounded-[10px] bg-gray-2 p-[10px] text-sm text-dark outline-none dark:bg-gray-1 dark:text-dark"
              name=""
              id=""
            ></textarea>
          </div>
          <ButtonDefault
            onClick={() => {
              updateSeoData(token, { description: inputValue });
              window.location.reload();
            }}
            label="Change"
            link="/"
            customClasses="bg-primary text-white mt-[10px] rounded-[5px] px-10 py-[10px] lg:px-8 xl:px-10"
          />
        </div>
        <div className="relative col-span-3 mt-[20px] flex flex-col justify-between rounded-[10px] border border-stroke bg-white px-4 py-[12px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-7.5 sm:py-[16px]">
          <div>
            <h4 className="text-left font-medium text-dark dark:text-white">
              Keywords
            </h4>
            <div className="mt-[20px] flex w-full items-center">
              <input
                type="text"
                value={inputTagsValue}
                onChange={handleTagsInputChange}
                className="scroll_style w-full rounded-l-full bg-gray-2 px-[15px] py-[10px] text-sm text-dark outline-none dark:bg-gray-1 dark:text-dark"
                placeholder="Write tags..."
                name=""
                id=""
              />
              <button
                onClick={handleAddTag}
                // link="/"
                className="rounded-r-full bg-primary py-[10px] text-sm text-white lg:px-8 xl:px-10"
              >
                Add
              </button>
            </div>
            <div className="mt-[20px] flex max-h-[155px] w-full flex-wrap items-start gap-[10px] overflow-y-scroll">
              {tags.map((tag: string, index) => {
                console.log(tags);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-[6px] rounded-full  bg-gray-2 text-xs dark:border-dark-4 dark:bg-dark-3 dark:text-white"
                  >
                    <p className="w-full py-[7px] pl-[16px] pr-[6px]">{tag}</p>
                    <span
                      onClick={() => handleRemoveTag(index)}
                      className="cursor-pointer rounded-r-full px-[10px] py-[7px] hover:bg-gray-4 dark:hover:bg-gray-6"
                    >
                      <svg
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18 17.94 6M18 18 6.06 6"
                        />
                      </svg>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <ButtonDefault
            onClick={() => {
              updateSeoData(token, { keywords: tags });
              window.location.reload();
            }}
            label="Save"
            link="/"
            customClasses="bg-primary text-white mt-[10px] w-fit rounded-[5px] px-10 py-[10px] lg:px-8 xl:px-10"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

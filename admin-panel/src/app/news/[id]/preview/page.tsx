"use client";
import { fetchSingleNews } from "@/api/news";
import { fetchProduct, fetchUserProducts } from "@/api/products";
import { fetchUser } from "@/api/users";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Rating from "@/components/Rating/Rating";
import TableTwo from "@/components/Tables/TableTwo";
import { NewsInterface, ProductInterface, UserInterface } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface PageProps {
  params: {
    id: string;
  };
}

const UserPreview: React.FC<PageProps> = ({ params }) => {
  const [singleNews, setSingleNews] = useState<NewsInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSingleNews(params.id);
        setSingleNews(data);
      } catch (err: any) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchData();
  }, []);

  const newsInfo = [
    { label: "Title", value: singleNews?.title },
    {
      label: "Created Date",
      value: new Date(singleNews?.createdAt ?? "").toLocaleDateString(),
    },
    { label: "Content", value: singleNews?.description },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="News / Preview" />
      <section className="mb-[50px] flex justify-between gap-[30px]">
        <aside className="h-fit w-full max-w-[515px] rounded-[10px] border border-stroke bg-white p-7.5 text-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h1 className="mb-[20px] text-[22px] font-bold">Information</h1>
          <div className="flex h-fit mb-[40px] w-full rounded-[20px] bg-white p-[20px]">
            <div className="flex flex-wrap justify-start gap-[8px]">
              {singleNews?.images?.map((img: any, i: number) => (
                <div
                  key={i}
                  className="relative h-[70px] w-[70px] rounded-[10px] xl:h-[80px] xl:w-[80px]"
                >
                  <Image
                    width={1000}
                    height={1000}
                    src={img.uri}
                    alt={"product image"}
                    className="h-full w-full rounded-[10px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {newsInfo.map((info, i) => {
            return (
              <div
                key={i}
                className={`flex w-full items-start justify-between ${i != newsInfo.length-1 && "border-b border-b-gray-7"} py-[6px]`}
              >
                <p className="w-1/2">{info.label}:</p>
                <p>{info.value}</p>
              </div>
            );
          })}
        </aside>
      </section>
    </DefaultLayout>
  );
};

export default UserPreview;

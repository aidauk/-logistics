"use client";
import { fetchNews } from "@/api/news";
import FlexWrap from "@/components/FlexWrap";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { defaultProductImage } from "@/imports";
import { NewsInterface } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewsPage = () => {
  const [news, setNews] = useState<NewsInterface[]>([]);

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews();
      setNews(data);
    };
    getNews();
  }, []);

  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper id="inside_wrapper" className="lg:flex-row flex-col">
        <div className="flex w-full items-center justify-between news_firstBox">
          <h2
            id="aboutpage_h2"
            className="text-32 text-additional font-semibold mr-20"
          >
            Блог новостей и полезных статей
          </h2>
          <select name="filter" id="">
            <option value="">сортировка</option>
            <option value="">сортировка</option>
            <option value="">сортировка</option>
          </select>
        </div>
        <FlexWrap className="mt-8">
          {news.map((item, index: number): React.ReactNode => {
            return (
              <div key={index} className="news_post mb-8">
                <div className="relative z-0 w-full h-[160px] overflow-hidden rounded-t-[10px]">
                  <Image
                    className="w-full he-full object-cover rounded-[10px]"
                    src={item.images[0].uri ?? defaultProductImage}
                    alt="default-image"
                    fill
                  />
                </div>

                <h3 className="font-semibold text-base mt-7 text-additional">
                  {item.title}
                </h3>
                <p className="text-orange text-xs font-normal">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="text-text text-sm font-normal my-5 leading-6">
                  {item.description}
                </p>

                <Link
                  href={`/news-page/${item._id}`}
                  className="mt-2 text-sm py-10 px-22 text-center border border-primary text-primary rounded-250"
                >
                  Подробнее
                </Link>
              </div>
            );
          })}
        </FlexWrap>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default NewsPage;

"use client";
import { fetchSingleNews } from "@/api/news";
import FlexWrap from "@/components/FlexWrap";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { defaultProductImage } from "@/imports";
import { NewsInterface } from "@/interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}
const SingleNewsPage: React.FC<PageProps> = ({ params }) => {
  const [news, setNews] = useState<NewsInterface | null>(null);

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchSingleNews(params.id);
      console.log("🚀 ~ getNews ~ data:", data);
      setNews(data ?? null);
    };
    getNews();
  }, []);

  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper id="inside_wrapper" className="lg:flex-row flex-col">
        <div className="single_news_box flex w-full gap-9">
          {news?.images[0] && (
            <div className="w-1/2 single_news_imngBox">
              <Image
                alt="Slider main image"
                src={news?.images[0]?.uri}
                height={1000}
                width={1000}
                className="w-full min-h-268 rounded-20 object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h1
              id="aboutpage_h2"
              className="text-32 text-additional font-semibold"
            >
              {news?.title}
            </h1>
            <p className="text-lg text-text inline-block font-normal single_news_date">
              Дата публикации:
              <span className="text-primary ml-3 inline-block font-semibold">
                {new Date(news?.createdAt || "").toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
        <div className="single_news_box flex w-full gap-9 my-16">
            <p className="text-lg text-text font-normal single_news_p">
              {news?.description}
            </p>
        </div>
        <FlexWrap className="flex items-center justify-end gap-[20px] single_news_flexWrap">
          {news?.images.map((image, i) => {
            return (
              <div key={i} className="single_news_post_img max-h-160">
                <Image
                  alt="Slider main image"
                  src={image.uri}
                  width={1000}
                  height={1000}
                  className="w-full h-full rounded-20 object-cover"
                />
              </div>
            );
          })}
        </FlexWrap>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default SingleNewsPage;

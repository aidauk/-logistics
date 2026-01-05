"use client";
import { fetchProduct } from "@/api/products";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Rating from "@/components/Rating/Rating";
import { ProductInterface } from "@/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface PageProps {
  params: {
    id: string;
  };
}
const reviews = [
  {
    createdAt: "2023-02-22",
    name: "John Doe",
    city: "New York",
    comment: "Great product! Really loved the quality.",
    rating: 5,
  },
  {
    createdAt: "2023-02-22",
    name: "Jane Smith",
    city: "London",
    comment: "Not bad, but could be better in terms of durability.",
    rating: 3,
  },
  {
    createdAt: "2023-02-22",
    name: "Mike Johnson",
    city: "Sydney",
    comment: "Excellent value for money!",
    rating: 4,
  },
  {
    createdAt: "2023-02-22",
    name: "Alice Brown",
    city: "Toronto",
    comment: "The delivery was late, but the product is good.",
    rating: 4,
  },
];

const ProdcutPreview: React.FC<PageProps> = ({ params }) => {
  const [product, setProduct] = useState<ProductInterface | null>();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchProduct(params.id);
        setProduct(response.data ?? null); // Assuming response.data holds the product data
      } catch (err) {
        console.error(err);
      } finally {
        return <div>Loading...</div>; // Stop loading after the fetch completes (success or error)
      }
    };

    getProduct();
  }, [params.id]);
  console.log("🚀 ~ product:", product);

  const productInfo = [
    { label: "Images", valueImages: product?.images },
    { label: "Name", value: product?.name },
    { label: "Category", value: product?.category },
    { label: "Rooms", value: product?.rooms },
    {
      label: "Contacts",
      grandChild: [
        { label: "Name", value: product?.contact.username },
        { label: "Phone number", value: product?.contact.phone },
      ],
    },
    { label: "Description", value: product?.description },
    {
      label: "Address",
      grandChild: [
        { label: "City", value: product?.address.city },
        { label: "District", value: product?.address.district },
        { label: "Street", value: product?.address.street },
        { label: "Details", value: product?.address.details },
      ],
    },
    { label: "Price", value: product?.price.amount },
    { label: "Type", value: product?.operation_type },
    { label: "Rating", value: product?.rating },
    { label: "State", value: product?.state },
    { label: "Comforts", arrayValue: product?.comforts.special },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Accommodations / Preview" />
      <section className="mt-[20px] flex justify-between gap-[30px]">
        {!product ? (
          <h1 className="mb-[20px] text-[22px] font-bold">
            No accommodation has found
          </h1>
        ) : (
          <>
            {" "}
            <aside className="h-fit w-full max-w-[515px] rounded-[10px] border border-stroke bg-white p-7.5 text-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <h1 className="mb-[20px] text-[22px] font-bold">Information</h1>
              <div className="mb-[40px] flex h-fit w-full rounded-[20px] bg-white p-[20px]">
                <div className="flex flex-wrap justify-start gap-[8px]">
                  {product?.images?.map((img: any, i: number) => (
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
              {productInfo.map((info, i) => {
                return (
                  <div
                    key={i}
                    className={`${info.grandChild || info.arrayValue ? "block" : "flex"} w-full  justify-between gap-[100px] ${i != --productInfo.length - 1 && "border-b border-b-gray-7"} py-[6px]`}
                  >
                    <p>{info.label}:</p>
                    <p className="text-right">{info.value}</p>
                    {info.grandChild &&
                      info.grandChild.map((innerInfo, i) => {
                        return (
                          <div
                            key={i}
                            className="ml-[15px] flex w-full items-center gap-[10px]"
                          >
                            <p>*{innerInfo.label}:</p>
                            <p>{innerInfo.value}</p>
                          </div>
                        );
                      })}
                    {info.arrayValue && (
                      <div className="ml-[15px] flex flex-wrap gap-[15px]">
                        {info.arrayValue.map((item) => {
                          return <p key={i}>*{item}</p>;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </aside>
            <aside className="h-fit w-full rounded-[10px] border border-stroke bg-white p-7.5 text-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <h1 className="mb-[20px] text-[22px] font-bold">Reviews</h1>
              {reviews.map((review, i) => {
                return (
                  <div
                    key={i}
                    className={`${i != reviews.length - 1 && "mb-[20px]"} flex min-h-[120px] flex-col justify-between border-b border-b-gray-7 py-[15px]`}
                  >
                    <div className="mb-[20px] flex w-full items-start justify-between">
                      <span>
                        <h2 className="text-lg font-semibold leading-[18px] text-primary">
                          {review.name}
                        </h2>
                        <p className="text-xs">{review.city}</p>
                      </span>
                      <Rating view={true} productRating={review.rating} />
                    </div>
                    <p>{review.comment}</p>
                  </div>
                );
              })}
            </aside>
          </>
        )}
      </section>
    </DefaultLayout>
  );
};

export default ProdcutPreview;

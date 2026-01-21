"use client";
import { fetchApplication } from "@/api/applications";
import { fetchCategories } from "@/api/categories";
import { fetchProduct, fetchUserProducts } from "@/api/products";
import { fetchUser } from "@/api/users";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Rating from "@/components/Rating/Rating";
import TableTwo from "@/components/Tables/TableTwo";
import {
  ApplicationInterface,
  CategoryInterface,
  ProductInterface,
  UserInterface,
} from "@/interfaces";
import React, { useEffect, useState } from "react";
interface PageProps {
  params: {
    id: string;
  };
}

const ApplicationsPreview: React.FC<PageProps> = ({ params }) => {
  const [application, setApplication] = useState<ApplicationInterface | null>(
    null,
  );
  const [token, setToken] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryInterface[] | null>(
    null,
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    setToken(token);
    const fetchData = async () => {
      try {
        const data = await fetchApplication(params.id, token);
        console.log("🚀 ~ fetchData ~ data:", data)
        const categories = await fetchCategories();
        setApplication(data);
        setCategories(categories ?? null);
      } catch (err: any) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchData();
  }, []);

  let category = null; // Declare category outside the if block

  if (application?.category) {
    category =
      categories?.find((cat) => cat._id === application.category)?.name ?? null; // Find and assign the name, or null if not found
  }

  const appInfo = [
    { label: "Name", value: application?.name },
    { label: "Phone", value: application?.phone },
    { label: "City", value: application?.city },
    { label: "State", value: application?.state },
    { label: "Category", value: category },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Applications / Preview" />
      <section className="mb-[50px] flex justify-between gap-[30px]">
        <aside className="h-fit w-full max-w-[515px] rounded-[10px] border border-stroke bg-white p-7.5 text-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h1 className="mb-[20px] text-[22px] font-bold">Information</h1>
          {appInfo.map((info, i) => {
            return (
              <div
                key={i}
                className={`flex  w-full items-center justify-between gap-[100px] ${i != --appInfo.length-1 && "border-b border-b-gray-7"} py-[6px]`}
              >
                <p className="w-1/2">{info.label}:</p>
                <p>{info.value ?? 'No information'}</p>
              </div>
            );
          })}
        </aside>
      </section>
    </DefaultLayout>
  );
};

export default ApplicationsPreview;

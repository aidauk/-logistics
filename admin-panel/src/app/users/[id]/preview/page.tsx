"use client";
import { fetchProduct, fetchUserProducts } from "@/api/products";
import { fetchUser } from "@/api/users";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Rating from "@/components/Rating/Rating";
import TableTwo from "@/components/Tables/TableTwo";
import { ProductInterface, UserInterface } from "@/interfaces";
import React, { useEffect, useState } from "react";
interface PageProps {
  params: {
    id: string;
  };
}

const UserPreview: React.FC<PageProps> = ({ params }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductInterface[] | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    setToken(token);
  }, []);

  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchUserProducts(params.id, token);
        console.log("🚀 ~ getProduct ~ data:", response);
        setProducts(response?.data ?? null); // Assuming response.data holds the product data
      } catch (err) {
        console.error(err);
      } finally {
        return <div>Loading...</div>; // Stop loading after the fetch completes (success or error)
      }
    };

    getProduct();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUser(token, params.id);
        setUser(data);
      } catch (err: any) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchData();
  }, []);

  const userInfo = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone },
    { label: "Address", value: user?.address },
    { label: "Gender", value: user?.gender },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users / Preview" />
      <section className="mb-[50px] flex justify-between gap-[30px]">
        <aside className="h-fit w-full max-w-[515px] rounded-[10px] border border-stroke bg-white p-7.5 text-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <h1 className="mb-[20px] text-[22px] font-bold">Information</h1>
          {userInfo.map((info, i) => {
            return (
              <div
                key={i}
                className={`flex  w-full items-center justify-between gap-[100px] ${i != --userInfo.length-1 && "border-b border-b-gray-7"} py-[6px]`}
              >
                <p className="w-1/2">{info.label}:</p>
                <p>{info.value}</p>
              </div>
            );
          })}
        </aside>
        {/* <aside className="h-fit w-full rounded-[10px] border border-stroke bg-white p-7.5 text-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card"></aside> */}
      </section>
      <section>
        <h1 className="mb-[30px] text-[26px] font-bold leading-[30px] text-dark dark:text-white">
          User products
        </h1>
        {products?.length == 0 ? 'No products found' : <TableTwo products={products}/> }        
      </section>
    </DefaultLayout>
  );
};

export default UserPreview;

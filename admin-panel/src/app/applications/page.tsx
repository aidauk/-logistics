"use client";
import { fetchApplications } from "@/api/applications";
import { fetchProducts } from "@/api/products";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import { ApplicationInterface, ProductInterface } from "@/interfaces";
import React, { useEffect, useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState<
    ApplicationInterface[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const getApplications = async () => {
      try {
        const data = await fetchApplications(token);
        setApplications(data ?? null); // Update state with product data
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    getApplications(); // Call the function once when the component mounts
  }, []); // Remove `products` from dependency array

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Applications" />
      {loading ? (
        <div>Loading...</div> // Show loading state while fetching
      ) : applications?.length == 0 ? (
        <div>No applications found</div>
      ) : (
        <TableThree applications={applications} />
      )}
    </DefaultLayout>
  );
};

export default Applications;

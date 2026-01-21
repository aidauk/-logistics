"use client"
import { fetchProducts } from "@/api/products";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableTwo from "@/components/Tables/TableTwo";
import { ProductInterface } from "@/interfaces";
import React, { useEffect, useState } from "react";

const PendingProducts = () => {
  const [products, setProducts] = useState<ProductInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response?.data.products ?? null); // Update state with product data
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    getProducts(); // Call the function once when the component mounts
  }, []); // Remove `products` from dependency array



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Accommodations" />
      {loading ? (
        <div>Loading...</div> // Show loading state while fetching
      ) : (
        products?.length == 0 ? (
          <div>No products found</div>
        ) : (
          <TableTwo products={products} />
        )
      )}
    </DefaultLayout>
  );
};

export default PendingProducts;

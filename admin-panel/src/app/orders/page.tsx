import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableFour from "@/components/Tables/TableFour";
import TableOne from "@/components/Tables/TableOne";
import TableTwo from "@/components/Tables/TableTwo";
import React from "react";

const Orders = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" />
      <TableFour />
    </DefaultLayout>
  );
};

export default Orders;

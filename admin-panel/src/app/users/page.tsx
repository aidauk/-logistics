import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableOne from "@/components/Tables/TableOne";
import TableTwo from "@/components/Tables/TableTwo";
import React from "react";

const Users = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <TableOne />
    </DefaultLayout>
  );
};

export default Users;

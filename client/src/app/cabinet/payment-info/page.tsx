'use client'
import ProfileLinks from "@/components/ProfileLinks";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper
        id="inside_wrapper"
        className="flex gap-20 md:flex-row flex-col"
      >
        <ProfileLinks />
        <aside className="flex-1">
        <h1 className="text-32 text-additional font-semibold mb-5">
          Платежные данные
        </h1>
      </aside>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default page;

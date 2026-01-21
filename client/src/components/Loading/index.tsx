import React from "react";
import CustomImage from "../CustomImage";
import { nonTransparentLoading, transparentLoading } from "@/imports";

const Loading = ({ type }: { type?: number }) => {
  return (
    <div className="">
      {type == 2 ? (
        <CustomImage
          alt="loading"
          image={nonTransparentLoading}
          style="max-w-[40px]"
        />
      ) : (
        <CustomImage
          alt="loading"
          image={transparentLoading}
          style="max-w-[100px]"
        />
      )}

      {/*  */}
    </div>
  );
};

export default Loading;

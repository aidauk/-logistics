import Image, { StaticImageData } from "next/image";
import React from "react";

const CustomImage = ({
  image,
  style,
  alt,
}: {
  image: StaticImageData;
  style?: string;
  alt: string;
}) => {
  return <Image src={image} alt={alt} width={1000} height={1000} className={style} />;
};

export default CustomImage;

"use client";
import { useSelector } from "react-redux";
import InsideWidthWrapper from "../InsideWrapper";
import { selectProduct } from "@/redux/features/products/slices/product.slice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Path {
  url?: string;
  name?: string;
}

const ShowPath = () => {
  const [path, setPath] = useState<Path>({});
  const [secondaryPath, setSecondaryPath] = useState<Path>({});
  const { data } = useSelector(selectProduct);
  const pathname = usePathname();

  useEffect(() => {
    function updatePath() {
      switch (pathname) {
        case "/about":
          setPath({ name: "О нас", url: "/about" });
          setSecondaryPath({});
          break;
        case "/products":
          setPath({ name: "Категории", url: "/products" });
          setSecondaryPath({});
          break;
        case `/products/${data._id}`:
          setPath({ name: "Категории", url: "/products" });
          setSecondaryPath({
            name: `${data.name}`,
            url: `/products/${data._id}`,
          });
          break;
        case "/news-page":
          setPath({ name: "Новости" });
          setSecondaryPath({});
          break;
        case `/news-page/${"news-name"}`:
          // setPath({ name: "Новости" });
          // setSecondaryPath({});
          break;
        default:
          setPath({ name: "404 Not Found" });
          setSecondaryPath({});
          break;
      }
    }

    updatePath();
  }, [pathname, data._id, data.name]);

  if (
    pathname == "/" ||
    pathname == "/add-object" ||
    pathname == "/add-object-information" ||
    pathname == "/edit-object" ||
    pathname == "/cabinet" ||
    pathname.includes("/edit-object") ||
    pathname.includes("/cabinet")
  )
    return null;

  if (
    pathname == "/booking-page" ||
    pathname == "/pay-page" ||
    pathname == "/thank-page"
  ) {
    return (
      <div className="w-full flex justify-center bg-white border-b border-b-[#E9E9E9]">
        <InsideWidthWrapper className="max-w-[1280px]">
          <ul className="w-full grid grid-cols-3">
            <Link
              href="/products"
              className={`text-center py-[15px] text-gray text-xs`}
            >
              1. Выбор объекта
            </Link>
            <Link
              href={`/booking-page`}
              className={`border-x border-x-[#E9E9E9] text-center py-[15px] text-xs ${
                pathname == `/booking-page`
                  ? "bg-primary text-white"
                  : "text-gray"
              }`}
            >
              2. Контактные данные
            </Link>
            <Link
              href="/pay-page"
              className={`text-center py-[15px] text-gray text-xs ${
                pathname == "/pay-page" ? "bg-primary text-white" : "text-gray"
              }`}
            >
              3.Оплата
            </Link>
          </ul>
        </InsideWidthWrapper>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-white border-b border-b-[#E9E9E9]">
      <InsideWidthWrapper className="py-[15px] max-w-[1280px]">
        <p className="text-additional text-xs font-medium">
          <Link href="/">Главная</Link>
          <span className="mx-[12px]">/</span>
          <Link
            href={path.url || ""}
            className={secondaryPath.name ? "" : "text-[#979797]"}
          >
            {path.name}
          </Link>
          {secondaryPath.name && (
            <>
              <span className="mx-[12px]">/</span>
              <Link className="text-[#979797]" href={secondaryPath.url || ""}>
                {secondaryPath.name}
              </Link>
            </>
          )}
        </p>
      </InsideWidthWrapper>
    </div>
  );
};

export default ShowPath;

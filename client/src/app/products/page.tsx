"use client";
import FlexWrap from "@/components/FlexWrap";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  CategoryInterface,
  ProductInterface,
  ProductFilters,
} from "@/interfaces";
import { defaultProductImage, down_arrow_black, filter } from "@/imports";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "@/redux/features/products/slices/products.slice";
import { fetchProducts } from "@/api/products";
import { statusTypes } from "@/redux/status-types";
import CustomSelect from "@/components/CustomSelect";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import CustomCalendar from "@/components/cusromDate";
import { fetchOrder } from "@/api/orders";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const options = [
  { value: "name&asc", label: "По имени от А до Я" },
  { value: "name&desc", label: "По имени от Я до А" },
  { value: "createdAt&desc", label: "По дате (от новых)" },
  { value: "createdAt&asc", label: "По дате (от старых)" },
];

const operation_types = [
  { value: "daily_rent", name: "Посуточная аренда" },
  { value: "monthly_rent", name: "Долгосрочная аренда" },
  { value: "sale", name: "Продажа" },
];

const categoryOptions: CategoryInterface[] = [
  { _id: "6729b914258ad779ded80d3d", name: "Квартира" },
  { _id: "668bdf92ed93cc7f62552116", name: "Котедж" },
  { _id: "668bdf9ced93cc7f62552117", name: "Дача" },
];

const comfortOptions = [
  { value: "Pool", label: "Бассейн" },
  { value: "Wi-Fi", label: "Wi-Fi" },
  { value: "Playground", label: "Площадка" },
  { value: "Gym", label: "Спортзал" },
  { value: "Parking", label: "Парковка" },
  { value: "Spa", label: "Спа" },
  { value: "PetFriendly", label: "Можно с животными" },
  { value: "AirConditioning", label: "Кондиционер" },
  { value: "Heating", label: "Отопление" },
  { value: "Laundry", label: "Прачечная" },
  { value: "Restaurant", label: "Ресторан" },
  { value: "RoomService", label: "Обслуживание номеров" },
];

const Products = () => {
  const router = useRouter();
  const accessToken = useLocalStorage("", "accessToken");
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector(selectProducts);
  const [open, setOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get("category") || "",
    city: searchParams.get("city") || "",
    comforts_special: searchParams.get("comforts_special")
      ? searchParams.get("comforts_special")?.split(",")
      : [],
    price_min: searchParams.get("price_min") || "",
    price_max: searchParams.get("price_max") || "",
    operation_type: searchParams.get("operation_type") || "",
    entry_date: searchParams.get("entry_date") || "",
    leaving_date: searchParams.get("leaving_date") || "",
    rooms: searchParams.get("rooms") || "",
    sort_by: searchParams.get("sort_by") || "",
    sort_order: searchParams.get("sort_order") || "",
    pageId: searchParams.get("pageId") || "",
    currency: searchParams.get("currency") || "UZS", // Default
  });

  const [selectedValue, setSelectedValue] = useState<string>();
  const [formValues, setFormValues] = useState({
    price_min: filters.price_min,
    price_max: filters.price_max,
    rooms: filters.rooms,
    city: filters.city,
  });
  const [entryDate, setEntryDate] = useState<Date | null>(
    filters.entry_date ? new Date(filters.entry_date) : null
  );
  console.log("🚀 ~ Products ~ entryDate:", entryDate);
  const [leavingDate, setLeavingDate] = useState<Date | null>(
    filters.leaving_date ? new Date(filters.leaving_date) : null
  );

  const updateFilters = (newFilters: ProductFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const query = new URLSearchParams(updatedFilters as Record<string, string>);
    router.push(`/products?${query.toString()}`);
  };

  const handleCheckboxChange = (value: string) => {
    const comforts = filters.comforts_special || [];
    const newComforts = comforts.includes(value)
      ? comforts.filter((item) => item !== value)
      : [...comforts, value];

    updateFilters({ comforts_special: newComforts });
  };

  const handleFilterSelectChange = (value: string) => {
    setSelectedValue(value);
    const [sort_by, sort_order] = value.split("&");
    updateFilters({ sort_by, sort_order });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(filters as Record<string, string>);

    dispatch(fetchProducts(queryParams.toString()));
  }, [dispatch, filters]);

  const handleDateRangeSelect = (entry: Date, leaving: Date) => {
    setEntryDate(entry);
    setLeavingDate(leaving);
  };

  const handleApply = () => {
    const newFilters = {
      ...formValues,
      entry_date: entryDate?.toLocaleDateString(),
      leaving_date: leavingDate?.toLocaleDateString(),
    };
    updateFilters(newFilters);
  };

  const handleClear = () => {
    setFilters({});
    setFormValues({
      price_min: "",
      price_max: "",
      rooms: "",
      city: "",
    });
    setEntryDate(null);
    setLeavingDate(null);

    // Update URL query parameters
    const query = new URLSearchParams({} as Record<string, string>);
    router.push(`/products?${query.toString()}`);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <MaxWidthWrapper className="bg-white flex justify-center relative">
      <InsideWidthWrapper
        id="inside_wrapper"
        className="flex lg:mx-40 lg:flex-row flex-col"
      >
        <aside className="mr-5 max-w-305 w-full flex flex-col gap-20 category_child1">
          <div id="shadow_box" className="change_box">
            <ul className="change_box_child">
              {operation_types.map((operation_type, i: number) => (
                <li
                  key={i}
                  onClick={() =>
                    updateFilters({ operation_type: operation_type.value })
                  }
                  className={`text-sm px-5 py-3 cursor-pointer text-additional ${
                    filters.operation_type === operation_type.value
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-secondary hover:text-white"
                  }`}
                >
                  {operation_type.name}
                </li>
              ))}
            </ul>
          </div>{" "}
          <h2 className="text-22 font-semibold text-additional mt-6 mb-3">
            Тип помещения
          </h2>
          <div id="shadow_box" className="change_box">
            <ul className="change_box_child">
              {categoryOptions.map((category: CategoryInterface, i: number) => (
                <li
                  key={category._id}
                  onClick={() => updateFilters({ category: category._id })}
                  className={`text-sm px-5 py-3 cursor-pointer text-additional ${
                    filters.category === category._id
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-secondary hover:text-white"
                  }`}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="text-22 font-semibold text-additional mt-6 mb-3">
            Фильтры
          </h2>
          <div id="shadow_box" className="px-5 py-7 rounded-10">
            <h3 className="text-sm text-additional font-semibold mb-3">
              Специальные удобства
            </h3>
            <form className="w-full flex flex-col gap-2">
              {comfortOptions.map((option) => (
                <div key={option.value} className="flex justify-between">
                  <div className="flex items-center">
                    <input
                      className="cursor-pointer"
                      checked={(filters.comforts_special ?? []).includes(
                        option.value
                      )}
                      onChange={() => handleCheckboxChange(option.value)}
                      type="checkbox"
                      name="comforts1"
                      value=""
                    />
                    <label
                      htmlFor={option.value}
                      className="ml-2 text-xs font-medium text-additional"
                    >
                      {option.label}
                    </label>
                  </div>
                </div>
              ))}
            </form>
          </div>
          <div
            id="shadow_box"
            className="px-5 py-7 rounded-10 flex flex-col gap-[10px]"
          >
            <div>
              <h3 className="text-sm text-additional font-semibold mb-3">
                Город
              </h3>
              <input
                min={1}
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleOnChange}
                className="px-[14px] outline-none border border-additional_border rounded-250 w-full flex-1 py-11 text-center text-additional text-xs"
              />
            </div>
            <div>
              <h3 className="text-sm text-additional font-semibold mb-3">
                Дата
              </h3>
              <CustomCalendar
                key={`${entryDate}-${leavingDate}`}
                customStyle="text-additional"
                open={open}
                setOpen={setOpen}
                bookings={[]}
                initialEntry_date={entryDate}
                initialLeaving_date={leavingDate}
                onSelectDateRange={handleDateRangeSelect}
              />
            </div>
            <div>
              <h3 className="text-sm text-additional font-semibold mb-3">
                Колличество комнат
              </h3>
              <input
                min={1}
                type="number"
                name="rooms"
                value={formValues.rooms}
                onChange={handleOnChange}
                className="px-[14px] outline-none border border-additional_border rounded-250 w-full flex-1 py-11 text-center text-additional text-xs"
              />
            </div>
            <div>
              <h3 className="text-sm text-additional font-semibold mb-3">
                Стоимость
              </h3>
              <div className="w-full flex flex-col gap-2">
                <div className="flex justify-between w-full items-center">
                  <input
                    type="number"
                    name="price_min"
                    value={formValues.price_min}
                    onChange={handleOnChange}
                    className="px-[14px] outline-none border border-additional_border rounded-250 max-w-126 w-full flex-1 py-11 text-center text-additional text-xs"
                  />
                  <p className="mx-2">-</p>
                  <input
                    name="price_max"
                    value={formValues.price_max}
                    onChange={handleOnChange}
                    type="number"
                    className="px-[14px] outline-none border border-additional_border rounded-250 max-w-126 w-full flex-1 py-11 text-center text-additional text-xs"
                  />
                </div>
                <div className="mt-[10px] flex flex-col w-full gap-[10px]">
                  <button
                    onClick={handleApply}
                    className="text-sm text-white bg-secondary px-43 py-3 rounded-250"
                  >
                    Применить
                  </button>
                  <button
                    onClick={handleClear}
                    className="text-sm text-white bg-additional px-43 py-3 rounded-250"
                  >
                    Очистить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <aside className="w-full flex flex-col justify-between">
          {status === statusTypes.LOADING || status === statusTypes.INIT ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <div>
              <div className="mb-5 flex justify-between category_box1">
                <h2
                  id="leftsided_h2"
                  className="text-32 text-left font-semibold text-additional"
                >
                  Дачи: найдено {data.count || 0} вариантов
                </h2>
                <CustomSelect
                  type={1}
                  options={options}
                  onChange={handleFilterSelectChange}
                  initialValue={selectedValue}
                  placeholder="СОРТИРОВКА"
                />
              </div>
              <div className="flex flex-wrap w-full gap-[20px]">
                <div
                  className={`flex flex-wrap w-full ${
                    data.products.length % 3 != 0
                      ? "justify-start gap-[20px]"
                      : "justify-between"
                  }`}
                >
                  {data.products.map(
                    (
                      product: ProductInterface,
                      index: number
                    ): React.ReactNode => {
                      if (index < data.pageSize) {
                        return (
                          <div
                            key={index}
                            className={`${
                              data.products.length < 3 ? "w-[40%]" : "w-31%"
                            } mb-8 category_product`}
                          >
                            <div className="w-full h-289 rounded-20 overflow-hidden category_img_Box">
                              <a href={`/products/${product._id}`}>
                                <Image
                                  src={
                                    product.images[0]
                                      ? product.images[0].uri
                                      : defaultProductImage
                                  }
                                  width={1000}
                                  height={1000}
                                  alt={"product image"}
                                  className="w-full h-full object-cover rounded-20"
                                />
                              </a>
                            </div>

                            <h3 className="font-semibold text-base mt-5 text-additional">
                              {product.name}
                            </h3>
                            <p className="text-orange text-xs mb-7 category_product_p">
                              {product.address.city}
                            </p>
                            <p className="text-text leading-6 text-sm">
                              {product.description}
                            </p>
                            <p className="text-primary my-5">
                              {product.price.amount} {product.price.currency}/{" "}
                              {product.operation_type === "daily_rent"
                                ? "За день"
                                : product.operation_type === "monthly_rent"
                                ? "За месяц"
                                : ""}
                            </p>

                            <button
                               onClick={() => {
                                dispatch(fetchOrder(accessToken, product._id))
                                router.push('/booking-page')
                              }}
                              id="booking_btn"
                              className="py-15 px-43 text-center border border-primary bg-primary text-white rounded-250"
                            >
                              Забронировать
                            </button>
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              </div>
              <Pagination
                pageSize={data.pageSize}
                totalPages={data.pages}
                updateFilters={updateFilters}
                productsLength={data.products.length}
              />
            </div>
          )}
        </aside>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default Products;

"use client";
import { ChangeEvent, useState } from "react";
import CustomCalendar from "../cusromDate";
import CustomSelect from "../CustomSelect";
import { SearchParams } from "@/interfaces";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const options = [
  { value: "6729b914258ad779ded80d3d", label: "Квартира" },
  { value: "668bdf92ed93cc7f62552116", label: "Котедж" },
  { value: "668bdf9ced93cc7f62552117", label: "Дача" },
];

// Assume bookings are fetched and stored in a `bookings` array

const Search = ({}: {}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [entryDate, setEntryDate] = useState<Date | null>(null);
  const [leavingDate, setLeavingDate] = useState<Date | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [operation_type, setOperation_type] = useState<string>("daily_rent");
  console.log("🚀 ~ Search ~ operation_type:", operation_type)

  const router = useRouter();
  const [filters, setFilters] = useState<SearchParams>({
    category: "",
    city: "",
    operation_type: "",
    rooms: "",
    entry_date: "",
    leaving_date: "",
  });

  const updateFilters = (newFilters: SearchParams) => {
    const updatedFilters = { ...filters, ...newFilters };
    const query = new URLSearchParams(updatedFilters as Record<string, string>);
    router.push(`/products?${query.toString()}`);
  };

  function handleSearch() {
    updateFilters({
      category: selectedValue,
      entry_date: entryDate?.toLocaleDateString() || "",
      leaving_date: leavingDate?.toLocaleDateString() || "",
      operation_type: operation_type,
      city: filters.city,
      rooms: filters.rooms,
    });
  }
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleDateRangeSelect = (entry: Date, leaving: Date) => {
    setEntryDate(entry);
    setLeavingDate(leaving);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("🚀 ~ handleOnChange ~ name, value:", name, value);

    setFilters((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  console.log(filters)

  return (
    <div id="search_box_container" className="relative w-full mb-[42px]">
      <div id="search_button_box" className="w-full flex gap-6 pl-7 absolute">
        <button
          onClick={() => setOperation_type("daily_rent")}
          className={
            "border-6 border-white font-normal text-sm rounded-250 py-13 w-full min-w-183 max-w-269 leading-[17.07px] " +
            (operation_type == "daily_rent"
              ? "bg-primary text-white"
              : "bg-backgr text-additional")
          }
        >
          Посуточная аренда
        </button>
        <button
          onClick={() => setOperation_type("monthly_rent")}
          className={
            "border-6 border-white font-normal rounded-250 text-sm py-13 w-full max-w-269 min-w-202 leading-[17.07px] " +
            (operation_type == "monthly_rent"
              ? "bg-primary text-white"
              : "bg-backgr text-additional")
          }
        >
          Долгосрочная аренда
        </button>
        <button
          onClick={() => setOperation_type("sale")}
          className={
            "border-6 border-white font-normal rounded-250 text-sm py-13 w-full max-w-151 min-w-130 leading-[17.07px] " +
            (operation_type == "sale"
              ? "bg-primary text-white"
              : "bg-backgr text-additional")
          }
        >
          Продажа
        </button>
      </div>
      <div className="bg-white h-full min-h-166 w-full flex items-center justify-center rounded-20">
        <div
          id="search_input_box"
          className="w-full flex lg:flex-row px-7 pt-7 gap-20 justify-between items-center"
        >
          <div className="flex w-full items-center gap-20 changer_box">
            <div className="flex gap-20 search_inside_input_box">
              <input
                type="text"
                name="city"
                value={filters.city}
                onChange={handleOnChange}
                id="searchInputs"
                placeholder="Город"
                className="lg:max-w-178 w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none"
              />
              <CustomSelect
                type={3}
                options={options}
                onChange={handleSelectChange}
                placeholder="Тип помещения"
              />
            </div>
            <CustomCalendar
              customStyle="text-opacity-[0.6]"
              open={open}
              setOpen={setOpen}
              bookings={[]}
              onSelectDateRange={handleDateRangeSelect}
            />
            <div className="search_inside_input_box">
              <input
                type="text"
                name="rooms"
                value={filters.rooms}
                onChange={handleOnChange}
                id="searchInputs"
                placeholder="Колличество комнат"
                className="lg:max-w-260 w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="hover:bg-secondary transition-all search_btn px-73 cursor-pointer py-15 w-full bg-primary rounded-250 text-white text-base font-medium max-w-200"
          >
            Найти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;

"use client";
import InsideWidthWrapper from "../InsideWrapper";
import AddIcon from "@mui/icons-material/Add";
import { facebook, plus, telegram, whatsapp, wk } from "@/imports";
import CustomImage from "../CustomImage";
import Link from "next/link";
import { useState } from "react";
import CustomSelect from "../CustomSelect";

const Header = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const options = [
    { value: "option1", label: "РУССКИЙ" },
    { value: "option2", label: "O'ZBEK" },
    { value: "option3", label: "ENGLISH" },
  ];

  return (
    <InsideWidthWrapper className="max-w-[1280px] mx-[20px] py-[10px] flex items-center justify-between sm:mx-[40px] xs:mx-[30px]">
      <div className="text-additional text-xs">
        <p className="hidden lg:inline">Выбор валюты:</p>
        <select
          name="lang"
          className="font-semibold pl-[10px] py-[6px] outline-none"
        >
          <option value="russian">UZS</option>
          <option value="uzbek">RUB</option>
        </select>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex gap-1 mr-[20px]">
          <Link
            href="#"
            className="bg-backgr p-[10px] h-[30px] w-[30px] rounded-1/2 flex justify-center items-center"
          >
            <CustomImage image={whatsapp} alt="whatsapp" />
          </Link>
          <Link
            href="#"
            className="bg-backgr p-[10px] h-[30px] w-[30px] rounded-1/2 flex justify-center items-center"
          >
            <CustomImage image={telegram} alt="whatsapp" />
          </Link>
          <Link
            href="#"
            className="bg-backgr p-[12px] h-[30px] w-[30px] rounded-1/2 flex justify-center items-center"
          >
            <CustomImage image={facebook} alt="whatsapp" />
          </Link>
          <Link
            href="#"
            className="bg-backgr p-[10px] h-[30px] w-[30px] rounded-1/2 flex justify-center items-center"
          >
            <CustomImage image={wk} alt="whatsapp" />
          </Link>
        </div>
        <CustomSelect
          type={2}
          options={options}
          onChange={handleSelectChange}
          placeholder="РУССКИЙ"
        />
        <Link
          href="/add-object"
          className="hidden lg:flex items-center gap-[10px] py-[8px] px-[30px] font-medium text-xs text-center bg-primary text-white rounded-[250px] hover:bg-secondary transition-all outline-none"
        >
          ДОБАВИТЬ ОБЪЯВЛЕНИЕ
          <CustomImage image={plus} alt="plus" style="w-[12px] h-[12px]" />
        </Link>
      </div>
    </InsideWidthWrapper>
  );
};

export default Header;

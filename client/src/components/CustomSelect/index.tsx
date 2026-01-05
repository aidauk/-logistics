import React, { useEffect, useState } from "react";
import CustomImage from "../CustomImage";
import { down_arrow_black } from "@/imports";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  type: number;
  initialValue?: string | null;
  customStyle?: string | null;
  bg?: string | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  type,
  initialValue,
  customStyle,
  bg,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  // Get the initial selected option based on initialValue
  const initialOption =
    options.find((option) => option.value == initialValue) || null;

  // Initialize selectedOption with a fallback to the first option or null
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    initialOption
  );

  // Sync selectedOption when initialValue changes (useful on refresh or re-render)
  useEffect(() => {
    if (initialValue) {
      const foundOption = options.find(
        (option) => option.value == initialValue
      );
      setSelectedOption(foundOption || null);
    }
  }, [initialValue, options]);

  // Handle option change
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };
  return (
    <div
      className={`relative inline-block change_box ${
        type == 1
          ? "w-[180px]"
          : type == 4 || type == 2
          ? "w-[120px]"
          : `${customStyle ?? 'w-full'}`
      }`}
    >
      <div
        className={`right-0 top-[-15px] bg-backgr rounded-20 cursor-pointer ${
          type == 4
            ? `px-[0px]`
            : type == 3
            ? `${
                bg ?? "bg-white"
              } w-full border ${customStyle ?? 'border-border'} outline-none rounded-250 py-[10px] px-[20px] text-xs font-normal`
            : "px-[14px]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="py-[6px] flex items-center justify-between">
          <span className={`text-text text-xs font-medium text-opacity-[0.6]`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <CustomImage
            image={down_arrow_black}
            alt="down-icon"
            style={`${type == 4 ? "max-w-[15px]" : "max-w-[18px]"} ml-[10px]`}
          />
        </div>
      </div>
      {isOpen && (
        <ul
          id="shadow_box"
          className={`change_box_child absolute bg-white mt-[10px] w-[180px] z-10 ${
            type == 3 && "w-full"
          } rounded-20`}
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              className={
                (i == index ? "bg-primary text-white" : "hover:bg-secondary") +
                ` px-[20px] ${
                  type == 3 ? "py-[13px]" : "py-[6px]"
                } text-xs hover:text-white ${customStyle} text-additional font-medium cursor-pointer hover:bg-gray-100`
              }
              onClick={() => {
                setIndex(i);
                handleOptionClick(option);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;

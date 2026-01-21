import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  type?: number;
  initialValue?: string | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  type,
  initialValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  // Get the initial selected option based on initialValue
  const initialOption =
    options.find((option) => option.value == initialValue) || null;

  // Initialize selectedOption with a fallback to the first option or null
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    initialOption,
  );

  // Sync selectedOption when initialValue changes (useful on refresh or re-render)
  useEffect(() => {
    if (initialValue) {
      const foundOption = options.find(
        (option) => option.value == initialValue,
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
    <div className={`relative ${type == 2 && "w-full"} inline-block`}>
      <div
        className={`right-0 top-[-15px] cursor-pointer ${type == 2 ? "w-full rounded-[250px] py-[12px] sm:py-[17px] dark:bg-white dark:text-gray-6" : "rounded-[10px] py-[12px] dark:bg-white/10 dark:text-gray-4 dark:hover:bg-gray-7 dark:hover:text-white"} bg-gray-2 px-[15px] sm:px-[20px]  hover:text-dark`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between gap-[20px]">
          <span
            className={`text-text ${type == 2 ? "text-xs" : "text-sm"} font-medium `}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`rotate-180 fill-current ${isOpen && "rotate-0"}`}
            width="18"
            height="18"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5525 7.72801C10.81 7.50733 11.1899 7.50733 11.4474 7.72801L17.864 13.228C18.1523 13.4751 18.1857 13.9091 17.9386 14.1974C17.6915 14.4857 17.2575 14.5191 16.9692 14.272L10.9999 9.15549L5.03068 14.272C4.7424 14.5191 4.30838 14.4857 4.06128 14.1974C3.81417 13.9091 3.84756 13.4751 4.13585 13.228L10.5525 7.72801Z"
              fill=""
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul
          className={`absolute z-10 ${type == 2 ? "w-full" : "w-[180px]"} mt-[10px] rounded-[10px] `}
        >
          {options.map((option, i) => (
            <li
              key={option.value}
              className={`${i == index ? "text-white dark:bg-primary dark:hover:bg-primary" : `${type == 2 ? "dark:bg-white dark:hover:bg-gray-5" : "dark:bg-gray-7 dark:hover:bg-gray-6"}`}
              ${i == 0 ? `rounded-t-[10px] border-b ${type == 2 ? "border-gray-4" : "border-gray-6"}` : i == options.length - 1 ? "rounded-b-[10px]" : `border-b ${type == 2 ? "border-gray-4" : "border-gray-6"}`}
              cursor-pointer
                 bg-gray-2 px-[20px] py-[10px] text-xs font-medium hover:text-dark dark:hover:text-white`}
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

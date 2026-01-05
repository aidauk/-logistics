"use client";
import { fetchUser, updateUser } from "@/api/users";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomSelect from "@/components/CustomSelect";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { UserInterface } from "@/interfaces";
import React, { useEffect, useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  phone: number | null;
  gender: string | null;
  address: string | null;
}

interface PageProps {
  params: {
    id: string;
  };
}

const UserEdit: React.FC<PageProps> = ({ params }) => {
  const [inputValues, setInputValues] = useState<UserProfile>({
    name: "",
    email: "",
    phone: null,
    gender: null,
    address: "",
  });
  const [data, setData] = useState<UserInterface>({} as UserInterface);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    setToken(token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUser(token, params.id);
        setData(data);
        setInputValues({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || null,
          gender: data.gender || null,
          address: data.address || "",
        });
      } catch (err: any) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchData();
  }, []);

  const options = [
    { value: "male", label: "Мужской" },
    { value: "female", label: "Женский" },
  ];

  // Handle input change with proper key type
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: any,
  ) => {
    setInputValues({
      ...inputValues,
      [key]: e.target.value, // Ensure proper typing for the value
    });
    console.log(3);
  };

  const handleSelectChange = (value: string) => {
    if (inputValues) {
      setInputValues({
        ...inputValues,
        gender: value,
      });
    }
    console.log(2);
  };

  const getChangedValues = (): Partial<UserProfile> => {
    const changedValues: Partial<UserProfile> = {};

    for (const key in inputValues) {
      if (
        inputValues.hasOwnProperty(key) &&
        inputValues[key as keyof UserProfile] !== data[key as keyof UserProfile]
      ) {
        changedValues[key] = inputValues[key as keyof UserProfile];
      }
    }

    return changedValues;
  };

  const updateUserProfile = async () => {
    try {
      const result = await updateUser(token, getChangedValues(), params.id);
      console.log("🚀 ~ updateUserProfile ~ result:", result)
      if (result) {
        alert("Профиль успешно изменен!");
         window.location.href = "/users";
      }
    } catch (error) {
      console.error("🚀 ~ updateUserProfile ~ error:", error);
    }
  };

  console.log(1);
  console.log(getChangedValues());

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users / Edit" />
      <form className="flex justify-center">
        <div className="w-fit flex-col items-center">
          <div className="flex w-fit flex-col gap-[20px] rounded-[20px] border border-stroke bg-white px-[15px] py-[16px] shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:px-[28px] sm:py-[20px] xl:px-[48px] xl:py-[36px]">
            <div className="flex flex-col justify-center">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={inputValues.name}
                onChange={(e) => handleInputChange(e, "name")}
                placeholder="Например: Дача 300"
                className="border-border mt-[10px] w-full rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:min-w-[475px] sm:px-[20px] sm:py-[17px]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={inputValues.email}
                onChange={(e) => handleInputChange(e, "email")}
                placeholder="Например: Дача 300"
                className="border-border mt-[10px] w-full rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:min-w-[475px] sm:px-[20px] sm:py-[17px]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                value={inputValues.phone ?? ""}
                onChange={(e) => handleInputChange(e, "phone")}
                id="phone"
                placeholder="Например: Дача 300"
                className="border-border mt-[10px] w-full rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:min-w-[475px] sm:px-[20px] sm:py-[17px]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={inputValues.address ?? ""}
                onChange={(e) => handleInputChange(e, "address")}
                placeholder="Например: Дача 300"
                className="border-border mt-[10px] w-full rounded-[250px] border px-[15px] py-[12px] text-xs font-normal text-dark outline-none sm:min-w-[475px] sm:px-[20px] sm:py-[17px]"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="mb-[10px]">Gender</h3>
              <CustomSelect
                type={2}
                options={options}
                initialValue={inputValues.gender}
                onChange={handleSelectChange}
                placeholder="Выберите время прибывания"
              />
            </div>
          </div>
          <button
            onClick={updateUserProfile}
            className="mt-[20px] w-full rounded-full bg-primary py-[13px] text-white"
          >
            Save
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default UserEdit;

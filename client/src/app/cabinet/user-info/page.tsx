"use client";
import ProfileLinks from "@/components/ProfileLinks";
import InsideWidthWrapper from "@/components/InsideWrapper";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { selectUser } from "@/redux/features/users/slices/user.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect from "@/components/CustomSelect";
import { AppDispatch } from "@/redux/store";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { updateUser } from "@/api/users";
import Loading from "@/components/Loading";
import { statusTypes } from "@/redux/status-types";

interface UserProfile {
  name: string;
  email: string;
  phone: number | null;
  gender: string | null;
  address: string | null;
}

const page = () => {
  const { data, status, error } = useSelector(selectUser);
  const accessToken = useLocalStorage("", "accessToken");
  const dispatch: AppDispatch = useDispatch();
  // State to manage whether the inputs are disabled
  const [isDisabled, setIsDisabled] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
  ]);

  const [inputValues, setInputValues] = useState<UserProfile>({
    name: "",
    email: "",
    phone: null,
    gender: null,
    address: null,
  });

  const options = [
    { value: "male", label: "Мужской" },
    { value: "female", label: "Женский" },
  ];

  const userProfile = [
    { label: "Имя", key: "name", value: inputValues.name },
    {
      label: "Адрес электронной почты",
      key: "email",
      value: inputValues.email,
    },
    { label: "Номер телефона", key: "phone", value: inputValues.phone },
    { label: "Адрес", key: "address", value: inputValues.address },
    { label: "Пол", key: "gender", value: inputValues.gender },
  ];

  useEffect(() => {
    if (data) {
      setInputValues({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || null,
        gender: data.gender || null,
        address: data.address || null,
      });
    }
  }, [data]);

  // Handle input change with proper key type
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: any
  ) => {
    setInputValues({
      ...inputValues,
      [key]: e.target.value, // Ensure proper typing for the value
    });
  };

  // Function to toggle the disabled state of a specific input
  const toggleDisabled = (index: number) => {
    setIsDisabled((prev) => {
      const newDisabledState = [...prev];
      newDisabledState[index] = !newDisabledState[index];
      return newDisabledState;
    });
  };

  const handleSelectChange = (value: string) => {
    if (inputValues) {
      setInputValues({
        ...inputValues,
        gender: value,
      });
    }
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

  return (
    <MaxWidthWrapper className="flex justify-center">
      <InsideWidthWrapper
        id="inside_wrapper"
        className="flex gap-20 md:flex-row flex-col"
      >
        <ProfileLinks />

        <aside className="cabinet_swiper">
          <h2
            id="leftsided_h2"
            className="text-32 text-additional font-semibold mb-5"
          >
            Персональные данные
          </h2>
          {status == statusTypes.LOADING || status == statusTypes.INIT ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            userProfile.map((info, i) => (
              <div
                className="rounded-20 bg-backgr flex justify-between mt-5 p-30 cabinet_userInfo_box"
                key={info.key}
              >
                <p className="text-xs text-gray font-normal w-full max-w-371">
                  {info.label}
                </p>
                {info.key !== "gender" ? (
                  <input
                    className="text-xs text-additional font-semibold w-full max-w-371 text-start bg-backgr outline-none"
                    disabled={isDisabled[i]}
                    value={info.value || ""}
                    placeholder={info.value ? "" : "Не заполнена"}
                    onChange={(e) => handleInputChange(e, info.key)}
                  />
                ) : (
                  <div className="max-w-[371px] w-full">
                    {info.value == null && isDisabled[i] ? (
                      <p className="text-xs text-additional">Выберите пол</p>
                    ) : isDisabled[i] ? (
                      <p className="text-xs text-additional">
                        {inputValues.gender == "male" ? "Мужской" : "Женский"}
                      </p>
                    ) : (
                      <CustomSelect
                        type={4}
                        options={options}
                        initialValue={inputValues.gender}
                        onChange={handleSelectChange}
                        placeholder="Выберите пол"
                      />
                    )}
                  </div>
                )}

                <span
                  onClick={() => {
                    toggleDisabled(i);
                    !isDisabled[i] &&
                      dispatch(updateUser(accessToken, getChangedValues()));
                  }}
                  className="text-xs text-orange cursor-pointer font-semibold"
                >
                  {isDisabled[i] ? "Изменить" : "Сохранить"}
                </span>
              </div>
            ))
          )}
        </aside>
      </InsideWidthWrapper>
    </MaxWidthWrapper>
  );
};

export default page;

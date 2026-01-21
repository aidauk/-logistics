"use client";
import { register } from "@/api/users";
import { selectUser } from "@/redux/features/users/slices/user.slice";
import { AppDispatch } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error } = useSelector(selectUser);

  const [verify, setVerify] = useState(false);

  return (
    <div className="bg-white w-full max-w-530 py-40 px-63 text-center rounded-20 absolute z-20">
      <h2 className="text-25 font-semibold text-additional mb-12 text-left">
        Регистрация
      </h2>
      <div className={"mb-12 text-text " + (verify && "hidden")}>
        <p className="text-lg mb-10 font-bold">Введите номер телефона</p>
        <p>и получите код подтверждения</p>
      </div>
      <div className={"mb-12 text-text " + (!verify && "hidden")}>
        <p className="text-lg mb-10 font-bold">Введите код из СМС</p>
        <p>
          отправленный на номер
          <br /> +998 (93) 865-35-77
        </p>
      </div>
      <form
        action={(formData) => {
          dispatch(register(formData));
        }}
        className="flex flex-col gap-20"
      >
        <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none " +
            (verify && "hidden")
          }
          type="text"
          name="name"
          minLength={2}
          maxLength={20}
          placeholder="ваше имя"
          required
        />
        <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none " +
            (verify && "hidden")
          }
          type="email"
          name="email"
          placeholder="ваш электронной адрес"
          required
        />
        <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none " +
            (verify && "hidden")
          }
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none " +
            (verify && "hidden")
          }
          type="password"
          name="confirm-password"
          placeholder="Повторите пароль"
          required
        />
        {/* <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none " +
            (!verify && "hidden")
          }
          type="number"
          maxLength={6}
          minLength={6}
          placeholder="Код"
          required
        /> */}
        {/* <button
          className={
            verify
              ? timeFinished
                ? "text-primary text-lg"
                : "text-time text-sm" 
              : "hidden"
          }
        >
          {timeFinished
            ? "Отправить снова"
            : "Отправить код повторно через 65 секунд"}
        </button> */}
        <p className={"text-sm mt-20 " + (!verify && "hidden")}>
          Нажимая «Войти» вы принимаете условия{" "}
          <a href="#" className="text-primary underline">
            Пользовательского соглашения
          </a>
        </p>
        {error ? (
          <p className="text-sm text-red-500">
            {error.message.includes("code 400")
              ? "Электронная почта уже зарегистрирована"
              : "пароль не подтвержден"}
          </p>
        ) : (
          ""
        )}
        <button
          className="px-73 cursor-pointer py-15 w-full bg-primary rounded-250 text-white text-base font-medium"
          type="submit"
        >
          {verify ? "Подтвердить" : "Зарегистрироваться"}
        </button>
        <button
          onClick={() => setVerify(false)}
          className={
            "px-73 cursor-pointer py-15 w-full bg-another_number rounded-250 text-base font-medium " +
            (!verify && "hidden")
          }
        >
          Другой номер
        </button>
      </form>
    </div>
  );
};

export default Register;

import { login } from "@/api/users";
import { openModal, selectModal } from "@/redux/features/modal-window/modal-window.slice";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import { selectUser } from "@/redux/features/users/slices/user.slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error } = useSelector(selectUser);

  return (
    <div className="bg-white w-full max-w-530 py-40 px-63 text-center rounded-20 absolute z-20">
      <h2 className="text-25 font-semibold text-additional mb-12 text-left">
        Войти
      </h2>
      <form action={(formData) => {
          dispatch(login(formData));
        }} className="flex flex-col gap-20">
        <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none "
          }
          type="email"
          name="email"
          placeholder="ваш электронной адрес"
          required
        />
        <input
          className={
            "w-full px-20 py-17 text-xs text-additional font-normal border border-additional_border rounded-250 outline-none "
          }
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
         {error ? (
          <p className="text-sm text-red-500">
            {error.message.includes('404') ? 'Электронная почта не найдена': 'Пароль неверный'}
          </p>
        ) : (
          ""
        )}
        <button
          className="px-73 cursor-pointer py-15 w-full bg-primary rounded-250 text-white text-base font-medium"
          type="submit"
        >
          Войти
        </button>
        <div className="flex gap-20">
          <a
            onClick={() => {
              // setVerify(true);
              dispatch(openModal({type: ModalWindowTypes.REGISTER}));
            }}
            className="text-xs text-primary underline cursor-pointer"
          >
            Востановить пароль
          </a>
          <a
            onClick={() => {
              // setVerify(false);
              dispatch(openModal({type: ModalWindowTypes.REGISTER}));
            }}
            className="cursor-pointer text-xs text-primary underline"
          >
            Регистрация
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

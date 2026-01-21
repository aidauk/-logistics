import { deleteProduct } from "@/api/products";
import { login } from "@/api/users";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  closeModal,
  openModal,
  selectModal,
} from "@/redux/features/modal-window/modal-window.slice";
import { ModalWindowTypes } from "@/redux/features/modal-window/modal-window.types";
import { selectUser } from "@/redux/features/users/slices/user.slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const MakeSure = () => {
  const dispatch: AppDispatch = useDispatch();
  const { item } = useSelector(selectModal);
  const accessToken = useLocalStorage("", "accessToken");
  console.log("🚀 ~ MakeSure ~ accessToken:", accessToken);

  const deleteClose = async () => {
    const isDeleted = await deleteProduct(accessToken, item);
    if (isDeleted) {
      dispatch(closeModal());
      window.location.reload();
    } else {
      // show error message
    }
  };

  return (
    <div className="bg-white w-full max-w-[371px] py-[30px] px-[40px] rounded-20 absolute z-20">
      <h2 className="text-25 font-semibold text-additional mb-[10px]">
        Удалить
      </h2>
      <p className="text-text text-sm">Вы удаляете свой объект</p>
      <div className="w-full gap-[10px] flex items-center mt-[40px]">
        <button
          onClick={() => dispatch(closeModal())}
          className="moreInfo_btn w-full py-10 px-22 text-center border border-primary text-white bg-primary rounded-250"
        >
          Отмена
        </button>
        <button
          onClick={deleteClose}
          className="moreInfo_btn w-full py-10 px-22 text-center border border-primary text-primary rounded-250"
        >
          Да
        </button>
      </div>
    </div>
  );
};

export default MakeSure;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { ModalWindowTypes } from "./modal-window.types";
import { ModalWindowState } from "./modal-window.state";

const initialState: ModalWindowState = {
  active: false,
  type: null,
  item: "",
};

const modalWindowSlice = createSlice({
  name: "modalWindow",
  initialState,
  reducers: {
    openModal(
      state,
      action: PayloadAction<{type: ModalWindowTypes, product_id: string} | any>
    ) {
      state.active = true;
      state.type = action.payload.type;
      state.item = action.payload.product_id;
    },
    closeModal(state) {
      state.active = false;
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalWindowSlice.actions;
export const selectModal = (state: RootState) => state.modalWindow;
export default modalWindowSlice.reducer;

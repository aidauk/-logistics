import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderInterface } from "@/interfaces";
import { RootState } from "@/redux/store";
import { orderInitailState } from "../order.initialize";
import { statusTypes } from "@/redux/status-types";

const initialState = orderInitailState;

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrderStart(state) {
      state.status = statusTypes.LOADING;
    },
    fetchOrderSuccess(state, action: PayloadAction<OrderInterface>) {
      state.status = statusTypes.SUCCESS;
      state.data = action.payload;
    },
    fetchOrderFailure(state, action: PayloadAction<string>) {
      state.status = statusTypes.ERROR;
      state.error = action.payload;
    }
  },
});

export const { fetchOrderStart, fetchOrderSuccess, fetchOrderFailure } = orderSlice.actions;
export const selectOrder = (state: RootState) => state.order;
export default orderSlice.reducer;

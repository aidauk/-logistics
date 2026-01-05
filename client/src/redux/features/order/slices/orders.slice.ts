import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderInterface } from "@/interfaces";
import { RootState } from "@/redux/store";
import { ordersInitailState } from "../order.initialize";
import { statusTypes } from "@/redux/status-types";

const initialState = ordersInitailState;

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchOrdersStart(state) {
      state.status = statusTypes.LOADING;
    },
    fetchOrdersSuccess(state, action: PayloadAction<OrderInterface[]>) {
      state.status = statusTypes.SUCCESS;
      state.data = action.payload;
    },
    fetchOrdersFailure(state, action: PayloadAction<string>) {
      state.status = statusTypes.ERROR;
      state.error = action.payload;
    }
  },
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = ordersSlice.actions;
export const selectOrders = (state: RootState) => state.orders;
export default ordersSlice.reducer;

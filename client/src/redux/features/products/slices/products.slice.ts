import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginatedProducts } from "@/interfaces";
import { productsInitialState } from "../products.initialize";
import { statusTypes } from "../../../status-types";
import { RootState } from "@/redux/store";

const initialState = productsInitialState;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.status = statusTypes.LOADING;
    },
    fetchProductsSuccess(state, action: PayloadAction<PaginatedProducts>) {
      state.status = statusTypes.SUCCESS;
      state.data = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.status = statusTypes.ERROR;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;

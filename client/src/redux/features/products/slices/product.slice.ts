import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginatedProducts, ProductInterface } from "@/interfaces";
import { productInitialState } from "../products.initialize";
import { statusTypes } from "../../../status-types";
import { RootState } from "@/redux/store";

const initialState = productInitialState;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductStart(state) {
      state.status = statusTypes.LOADING;
    },
    fetchProductSuccess(state, action: PayloadAction<ProductInterface>) {
      state.status = statusTypes.SUCCESS;
      state.data = action.payload;
    },
    fetchProductFailure(state, action: PayloadAction<string>) {
      state.status = statusTypes.ERROR;
      state.error = action.payload;
    },
    fetchProductReset(state) {
      state.status = null;
      state.error = null;
      state.data = initialState.data;
    },
  },
});

export const {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
  fetchProductReset,
} = productSlice.actions;
export const selectProduct = (state: RootState) => state.product;
export default productSlice.reducer;

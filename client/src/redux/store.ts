import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productsReducer from "./features/products/slices/products.slice";
import productReducer from "./features/products/slices/product.slice";
import orderReducer from "./features/order/slices/order.slice";
import ordersReducer from "./features/order/slices/orders.slice";
import userReducer from "./features/users/slices/user.slice";
import modalWindowReducer from "./features/modal-window/modal-window.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      product: productReducer,
      order: orderReducer,
      products: productsReducer,
      orders: ordersReducer,
      modalWindow: modalWindowReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
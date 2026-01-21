import { dachillaAPI } from "@/lib";
import {
  fetchOrderFailure,
  fetchOrderStart,
  fetchOrderSuccess,
} from "@/redux/features/order/slices/order.slice";
import { fetchOrdersFailure, fetchOrdersStart, fetchOrdersSuccess } from "@/redux/features/order/slices/orders.slice";
import { AppThunk } from "@/redux/store";

export const fetchOrder =
  (accessToken: string, productId: string): AppThunk =>
  async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    dispatch(fetchOrderStart());
    try {
      const response = await dachillaAPI.post("/orders", { productId }, config);
      dispatch(fetchOrderSuccess(response.data));
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      dispatch(fetchOrderFailure(error.message));
    }
  };

export const fetchMyCreatedOrder =
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    dispatch(fetchOrderStart());
    try {
      const response = await dachillaAPI.get("/orders/my/created", config);
      dispatch(fetchOrderSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchOrderFailure(error.message));
    }
  };

  export const fetchMyOrders =
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    dispatch(fetchOrdersStart());
    try {
      const response = await dachillaAPI.get("/orders/my", config);
      dispatch(fetchOrdersSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchOrdersFailure(error.message));
    }
  };

export const addBookingInfo =
  (accessToken: string, formData: FormData): AppThunk =>
  async (dispatch) => {
    const name = formData.get("name") as string;
    const lastName = formData.get("lastname") as string;
    const entry_date = formData.get("entry_date") as string;
    const leaving_date = formData.get("leaving_date") as string;
    const guests = Number(formData.get("guests") as string);
    const email = formData.get("email") as string;
    const phone = Number(formData.get("phone") as string);
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    console.log("Requesting to put");
    dispatch(fetchOrderStart());
    try {
      const response = await dachillaAPI.put(
        "/orders",
        {
          name,
          lastName,
          entry_date,
          leaving_date,
          guests,
          email,
          phone,
        },
        config
      );
      dispatch(fetchOrderSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchOrderFailure(error.message));
    }
  };

// export const payOrder =
//   (accessToken: string, orderId: string): AppThunk =>
//   async (dispatch) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       withCredentials: true,
//     };
//     dispatch(fetchOrderStart());
//     try {
//       const response = await dachillaAPI.put(
//         `/orders/${orderId}/pay`,
//         {
//           paymentId: "66031762b982b9f8dfd30706",
//         },
//         config
//       );
//       console.log("🚀 ~ response:", response)
//       dispatch(fetchOrderSuccess(response.data));
//     } catch (error: any) {
//       console.log("🚀 ~ error: any:", error)
//       dispatch(fetchOrderFailure(error.message));
//     }
//   };

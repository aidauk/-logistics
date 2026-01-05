import { statusTypes } from "@/redux/status-types";
import { initialProduct } from "../products/products.initialize";
import { OrdersState, OrderState } from "./order.state";
import { OrderInterface } from "@/interfaces";

export const orderInitailState: OrderState = {
  error: null,
  data: {
    userId: "",
    product: initialProduct,
    paymentId: "",
    booking_info: {
      name: "",
      lastName: "",
      email: "",
      phone: 0,
      entry_date: "",
      leaving_date: "",
      guests: 0,
    },
    paymentResult: {
      _id: "",
    },
    profit: {
      currency: "",
      amount: 0,
    },
    state: "",
    isPaid: false,
    paid_at: new Date(),
    archived_at: new Date(),
    canceled_at: new Date(),
  },
  status: statusTypes.INIT,
};

export const ordersInitailState: OrdersState = {
  error: null,
  data: [] as OrderInterface[],
  status: statusTypes.INIT,
};

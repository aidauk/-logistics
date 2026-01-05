import { OrderInterface } from "@/interfaces";
import { statusTypes } from "@/redux/status-types";

export interface OrderState {
  error: any;
  data: OrderInterface;
  status: statusTypes;
}

export interface OrdersState {
  error: any;
  data: OrderInterface[];
  status: statusTypes;
}

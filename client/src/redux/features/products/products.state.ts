import { PaginatedProducts, ProductInterface } from "@/interfaces";
import { statusTypes } from "../../status-types";

export interface ProductState {
  error: any;
  data: ProductInterface;
  status: statusTypes;
}

export interface ProductsState {
  error: any;
  data: PaginatedProducts;
  status: statusTypes;
}

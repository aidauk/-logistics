import { statusTypes } from "@/redux/status-types";
import { ProductsState, ProductState } from "./products.state";

export const initialProduct = {
  rooms: 0,
  price: {
    currency: "",
    amount: 0,
  },
  numReviews: 0,
  rating: 0,
  category: "",
  user: "",
  bookings: [],
  reviews: [],
  description: "",
  images: [],
  comforts: {
    special: [],
    additional: "",
  },
  operation_type: "",
  state: "",
  address: {
    city: "",
    district: "",
    street: "",
    details: "",
  },
  user_details: {
    fullname: "",
    email: "",
    phone: 0,
  },
  contact: {
    username: "",
    phone: 0,
  },
  name: "",
  createdAt: new Date(),
  _id: "",
};

export const productInitialState: ProductState = {
  error: null,
  data: initialProduct,
  status: statusTypes.INIT,
};

export const productsInitialState: ProductsState = {
  error: null,
  data: {
    products: [],
    page: 1,
    pages: 1,
    count: 0,
    pageSize: 18,
  },
  status: statusTypes.INIT,
};

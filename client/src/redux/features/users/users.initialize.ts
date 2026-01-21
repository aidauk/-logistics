import { statusTypes } from "@/redux/status-types";
import { UsersState, UserState } from "./users.state";

export const userInitailState: UserState = {
  status: statusTypes.INIT,
  data: {
    _id: "",
    email: "",
    name: "",
    isAdmin: false,
    accessToken: "",
    favorites: [],
    products: [],
  },
  error: null,
};

export const usersInitailState: UsersState = {
  status: statusTypes.INIT,
  data: [],
  error: null,
};

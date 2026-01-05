import { UserInterface } from "@/interfaces";
import { statusTypes } from "../../status-types";

export interface UserState {
  error: any;
  data: UserInterface;
  status: statusTypes;
}

export interface UsersState {
  error: any;
  data: UserInterface[];
  status: statusTypes;
}

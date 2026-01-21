import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "@/interfaces";
import { statusTypes } from "../../../status-types";
import { RootState } from "@/redux/store";
import { userInitailState } from "../users.initialize";

const initialState = userInitailState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.status = statusTypes.LOADING;
    },
    fetchUserSuccess(state, action: PayloadAction<UserInterface>) {
      state.status = statusTypes.SUCCESS;
      state.data = action.payload;
    },
    userReset(state) {
      state.status = statusTypes.SUCCESS;
      state.data = initialState.data;
    },
    fetchUserFailure(state, action: PayloadAction<any | null>) {
      state.status = statusTypes.ERROR;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure, userReset } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

'use client'
import { dachillaAPI } from "@/lib";
import { closeModal } from "@/redux/features/modal-window/modal-window.slice";
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
  userReset,
} from "@/redux/features/users/slices/user.slice";
import { AppThunk } from "@/redux/store";

export const login =
  (formData: FormData): AppThunk =>
  async (dispatch) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    dispatch(fetchUserStart());
    try {
      const { data } = await dachillaAPI.post(
        "/auth/login",
        {
          email,
          password,
        },
        config
      );

      dispatch(fetchUserSuccess(data));
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(closeModal());
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      dispatch(fetchUserFailure(error));
    }
  };

export const register =
  (formData: FormData): AppThunk =>
  async (dispatch) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    dispatch(fetchUserStart());
    try {
      if (password !== confirmPassword) {
        return dispatch(
          fetchUserFailure({ message: "password is not confirmed" })
        );
      }
      const { data } = await dachillaAPI.post(
        "/auth/register",
        {
          name,
          email,
          password,
        },
        config
      );

      dispatch(fetchUserSuccess(data));
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(closeModal());
    } catch (error: any) {
      dispatch(fetchUserFailure(error));
    }
  };

export const getCurrentUser =
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    dispatch(fetchUserStart());
    console.log("fetching the current user");
    try {
      const { data } = await dachillaAPI.get("/auth/profile", config);

      console.log("🚀 ~ data:", data);
      dispatch(fetchUserSuccess(data));
    } catch (error: any) {
      dispatch(fetchUserFailure(error));
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  console.log("logging out");
  try {
    await dachillaAPI.post("/auth/logout", {}, { withCredentials: true });

    dispatch(userReset());
  } catch (error: any) {
    if (error?.response?.data?.message) {
      console.log(error.response.data.message);
    } else {
      console.log("Logout error:", error?.message || error);
    }
  }
};

export const updateUser =
  (accessToken: string, inputData: any): AppThunk =>
  async (dispatch) => {
    console.log("🚀 ~ updateUser:");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    dispatch(fetchUserStart());
    try {
      const { data } = await dachillaAPI.put(
        "/auth/profile",
        inputData,
        config
      );

      dispatch(fetchUserSuccess(data));
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      dispatch(fetchUserFailure(error));
    }
  };

export const addFavorites =
  (accessToken: string, productId: string): AppThunk =>
  async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    console.log("🚀 ~ productId:", productId);

    dispatch(fetchUserStart());
    try {
      const { data } = await dachillaAPI.put(
        "/auth/favorites",
        { productId: productId },
        config
      );

      dispatch(fetchUserSuccess(data));
    } catch (error: any) {
      console.log("🚀 ~ error:", error);
      dispatch(fetchUserFailure(error));
    }
  };

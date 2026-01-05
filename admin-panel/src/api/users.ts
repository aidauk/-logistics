import { CategoryInterface, UserInterface } from "@/interfaces";
import { dachillaAPI } from "@/lib";

export const fetchUsers = async (
  accessToken: string | null,
): Promise<UserInterface[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  try {
    const { data } = await dachillaAPI.get("/users", config);

    return data;
  } catch (error: any) {
    console.error("🚀 ~ fetchUsers ~ error:", error);
    return [];
  }
};

export const getCurrentUser = async (
  accessToken: string | null,
): Promise<UserInterface> => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  console.log("Fetching the current user");

  try {
    const { data } = await dachillaAPI.get("/auth/profile", config);
    return data;
  } catch (error: any) {
    console.error("🚀 ~ getCurrentUser ~ error:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const logout = async () => {
  try {
    console.log("requesting to log out...");
    return await dachillaAPI.post("/auth/logout", {}, { withCredentials: true });
  } catch (error: any) {
    if (error?.response?.data?.message) {
      console.log(error.response.data.message);
    } else {
      console.log("Logout error:", error?.message || error);
    }
  }
};

export const fetchUser = async (
  accessToken: string | null,
  user_id: string,
): Promise<UserInterface> => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  try {
    const { data } = await dachillaAPI.get<UserInterface>(
      `/users/${user_id}`,
      config,
    );

    return data;
  } catch (error: any) {
    console.error("🚀 ~ fetchUser ~ error:", error);
    return {} as UserInterface;
  }
};

export const updateUser = async (
  accessToken: string | null,
  inputData: any,
  user_id: string,
) => {
  console.log("🚀 ~ inputData:", inputData);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  try {
    const { data } = await dachillaAPI.put(
      `/users/${user_id}`,
      inputData,
      config,
    );

    console.log("🚀 ~ data:", data);
    return data;
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
  }
};

export const deleteUser = async (id: string, accessToken: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    const response = await dachillaAPI.delete(`users/${id}`, config);

    return response;
  } catch (error) {
    console.error("Error occurred during deleting the user", error);
    return null;
  }
};

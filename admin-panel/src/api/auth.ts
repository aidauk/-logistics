import { dachillaAPI } from "@/lib";

export const Adminlogin = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  try {
    const { data } = await dachillaAPI.post(
      "/auth/admin/login",
      {
        email,
        password,
      },
      config,
    );

    localStorage.setItem("accessToken", data.accessToken);
    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
    return error;
  }
};

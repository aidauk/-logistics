import { ApplicationInterface } from "@/interfaces";
import { dachillaAPI } from "@/lib";

export const fetchApplications = async (
  accessToken: string | null,
): Promise<ApplicationInterface[]> => {
  try {
    const { data } = await dachillaAPI.get<ApplicationInterface[]>(
      "/applications",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );

    return data;
  } catch (error: any) {
    console.error("🚀 ~ fetchApplications error:", error);
    // Возвращаем пустой массив, чтобы не ломать места, где ожидается список
    return [];
  }
};

export const fetchApplication = async (
  id: string,
  accessToken: string | null,
): Promise<ApplicationInterface> => {
  try {
    const { data } = await dachillaAPI.get<ApplicationInterface>(
      `/applications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );

    return data;
  } catch (error: any) {
    console.error("🚀 ~ fetchApplication error:", error);
    // Возвращаем пустой объект нужного типа
    return {} as ApplicationInterface;
  }
};

export const updateAppToAnswered = async (
  accessToken: string | null,
  id: string,
) => {
  console.log("🚀 ~ accessToken:", accessToken);
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  try {
    const response = await dachillaAPI.put<ApplicationInterface>(
      `/applications/${id}`,
      {},
      config,
    );

    return response;
  } catch (error: any) {
    console.log("🚀 ~ updateAppToAnswered error:", error);
    // Если это Axios-ошибка, возвращаем response, чтобы можно было прочитать status
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

export const deleteApplication = async (
  accessToken: string | null,
  id: string,
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    const response = await dachillaAPI.delete(`/applications/${id}`, config);

    return response;
  } catch (error: any) {
    console.log("🚀 ~ deleteApplication error:", error);
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

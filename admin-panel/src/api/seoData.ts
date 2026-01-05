import { SeoDataInterface } from "@/interfaces";
import { dachillaAPI } from "@/lib";

export const fetchSeoData = async (): Promise<SeoDataInterface> => {
  try {
    const { data } = await dachillaAPI.get<SeoDataInterface>("/seo", {
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    console.log("🚀 ~ fetchSeoData ~ error:", error);
    // Возвращаем пустой объект нужного типа
    return {} as SeoDataInterface;
  }
};

export const updateSeoData = async (
  accessToken: string | null,
  inputData: any,
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
    const { data } = await dachillaAPI.put(`/seo`, inputData, config);

    console.log("🚀 ~ data:", data);
    return data;
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return {} as SeoDataInterface;
  }
};

export const uploadMainImage = async (
  accessToken: string | null,
  file: FormData
) => {  
    
  try {
    const config_images = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const response = await dachillaAPI.post(
      `images/main`,
      file,
      config_images,
    );

    return response;
  } catch (error: any) {
    console.log("🚀 ~ uploadMainImage ~ error:", error);
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

export const deleteMainImage = async (
  accessToken: string | null,
) => {
  try {
    const config_images = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    const response = await dachillaAPI.delete(`images/main`, config_images);

    return response;
  } catch (error: any) {
    console.log("🚀 ~ deleteMainImage ~ error:", error);
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

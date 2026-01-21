import { NewsInterface } from "@/interfaces";
import { dachillaAPI } from "@/lib";

export const fetchNews = async (): Promise<NewsInterface[]> => {
  try {
    const { data } = await dachillaAPI.get<NewsInterface[]>("/news", {
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    console.error("🚀 ~ fetchNews error:", error);
    // Возвращаем пустой массив, чтобы не ломать места, где ожидается список
    return [];
  }
};

export const fetchSingleNews = async (id: string): Promise<NewsInterface> => {
  try {
    const { data } = await dachillaAPI.get<NewsInterface>(`/news/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    console.error("🚀 ~ fetchSingleNews error:", error);
    // Возвращаем пустой объект нужного типа
    return {} as NewsInterface;
  }
};

export const createNews = async (
  accessToken: string | null,
  inputData: FormData,
  imagesData: FormData,
) => {
  console.log("🚀 ~ imagesData:", imagesData)
  console.log("🚀 ~ inputData:", inputData)
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const config_images = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  try {
    const { data } = await dachillaAPI.post(`/news`, inputData, config);

    if (imagesData && data) {
      await dachillaAPI.post<NewsInterface>(
        `images/news/${data._id}`,
        imagesData,
        config_images,
      );
    }else {
      throw new Error(`Something went wrong`)
    }

    return data;
  } catch (error: any) {
    console.log("🚀 ~ createNews error:", error);
    throw error;
  }
};

export const updateSingleNews = async (
  id: string,
  accessToken: string | null,
  credentials: NewsInterface | null,
  imagesData: FormData,
  deletingImages: string[],
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const config_images = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  console.log(deletingImages);
  console.log("🚀 ~ credentials:", credentials)
  try {
    const { data } = await dachillaAPI.put<NewsInterface>(
      `news/${id}`,
      credentials,
      config,
    );
    console.log(data);
    if (data) {
      if (deletingImages.length > 0) {
        await dachillaAPI.delete<NewsInterface>(
          `images/news/${data._id}`,
          {
            data: { imagePaths: deletingImages },
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
      }
      if (imagesData) {
        await dachillaAPI.post<NewsInterface>(
          `images/news/${data._id}`,
          imagesData,
          config_images,
        );
      }
    }
    return data;
  } catch (error: any) {
    console.error("🚀 ~ updateSingleNews error:", error);
    throw error;
  }
};

export const deleteSigleNews = async (
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

    const response = await dachillaAPI.delete(`/news/${id}`, config);

    return response;
  } catch (error: any) {
    console.log("🚀 ~ deleteSigleNews error:", error);
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

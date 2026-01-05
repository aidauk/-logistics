import { NewsInterface } from "@/interfaces";
import { dachillaAPI } from "@/lib";

export const fetchNews = async (): Promise<NewsInterface[]> => {
  try {
    const { data } = await dachillaAPI.get<NewsInterface[]>("/news", {
      withCredentials: true,
    });

    return data;
  } catch (error: any) {
    console.log("🚀 ~ fetchNews ~ error:", error);
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
    console.log("🚀 ~ fetchSingleNews ~ error:", error);
    // Возвращаем пустой объект нужного типа
    return {} as NewsInterface;
  }
};
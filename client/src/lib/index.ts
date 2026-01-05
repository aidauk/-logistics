import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const dachillaAPI = axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000",
});

/**
 * Универсальный helper для безопасной работы с axios.
 * - Всегда возвращает data нужного типа или бросает осмысленную ошибку.
 * - Логирует сетевые/серверные ошибки в одном месте.
 */
export async function safeAxios<T = any>(
  request: Promise<AxiosResponse<T>>,
): Promise<T> {
  try {
    const { data } = await request;
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError<any>;

    if (error.response) {
      console.error(
        "API error:",
        error.response.status,
        error.response.data || error.message,
      );
      throw new Error(
        (error.response.data && (error.response.data.message || error.response.data.error)) ||
          `Request failed with status ${error.response.status}`,
      );
    }

    if (error.request) {
      console.error("Network error (no response):", error.message);
      throw new Error("Network error. Please check your connection.");
    }

    console.error("Unexpected error:", error.message);
    throw new Error(error.message || "Unexpected error");
  }
}

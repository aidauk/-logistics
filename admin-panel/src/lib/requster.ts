import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

export const adminAPI = axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000",
  withCredentials: true,
});

export function prepareAxiosConfig(
  method: string,
  data: any,
  token: string,
): AxiosRequestConfig {
  return <AxiosRequestConfig>{
    method,
    url: process.env.API_URL || "http://localhost:4000",
    timeout: 60 * 1000, // wait for 60 sec than throw error
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
    withCredentials: true, // Enable Cookies
    validateStatus: function (status) {
      return true; // default
    },
  };
}

export async function request(
  options: AxiosRequestConfig,
): Promise<AxiosPromise> {
  try {
    const response = await axios(options);

    return response;
  } catch (error: AxiosError | any) {
    return error;
  }
}

/**
 * Универсальный helper для админки: безопасная работа с adminAPI.
 * Возвращает только data или кидает осмысленную ошибку.
 */
export async function safeAdminAxios<T = any>(
  request: Promise<AxiosResponse<T>>,
): Promise<T> {
  try {
    const { data } = await request;
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError<any>;

    if (error.response) {
      console.error(
        "Admin API error:",
        error.response.status,
        error.response.data || error.message,
      );
      throw new Error(
        (error.response.data && (error.response.data.message || error.response.data.error)) ||
          `Request failed with status ${error.response.status}`,
      );
    }

    if (error.request) {
      console.error("Admin network error (no response):", error.message);
      throw new Error("Network error. Please check your connection.");
    }

    console.error("Admin unexpected error:", error.message);
    throw new Error(error.message || "Unexpected error");
  }
}

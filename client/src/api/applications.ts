import { ApplicationInterface } from "@/interfaces";
import { dachillaAPI } from "@/lib";

export const createApplicaiton = async (
  formData: FormData,
  category?: string
) => {
  const phone = Number(formData.get("phone"));
  const name = formData.get("name")?.toString();
  const city = formData.get("city")?.toString();

  console.log(name, phone, city, category);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  try {
    const response = await dachillaAPI.post<ApplicationInterface>(
      `/applications`,
      { name, phone, city, category },
      config
    );

    return response;
  } catch (error: any) {
    console.log("🚀 ~ createApplicaiton error:", error);
    // Если это Axios-ошибка, возвращаем именно response, чтобы у вызывающего кода
    // всегда был объект с полем status.
    if (error.response) {
      return error.response;
    }
    throw error;
  }
};

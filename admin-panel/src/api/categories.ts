import { CategoryInterface } from "@/interfaces";
import { dachillaAPI } from "@/lib";

export const fetchCategories = async (): Promise<CategoryInterface[]> => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await dachillaAPI.get("/categories", config);

    return data;
  } catch (error: any) {
    return [];
  }
};


import { dachillaAPI } from "@/lib";
import { PaginatedProducts, ProductInterface } from "@/interfaces";
import { safeAdminAxios } from "@/lib/requster";

export const fetchProducts = async (
  keyword: string = "",
  pageId: number = 1,
) => {
  try {
    console.log("requesting to get products");
    return await safeAdminAxios<PaginatedProducts>(
      dachillaAPI.get<PaginatedProducts>(
        `/products?keyword=${keyword}&pageId=${pageId}`,
      ),
    );
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
    throw error;
  }
};

export const fetchProduct = async (id: string) => {
  try {
    const product = await safeAdminAxios<ProductInterface>(
      dachillaAPI.get<ProductInterface>(`products/${id}`),
    );
    return product;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const fetchMyProduct = async (id: string) => {
  try {
    return await safeAdminAxios<ProductInterface>(
      dachillaAPI.get<ProductInterface>(`products/${id}`),
    );
  } catch (error: any) {
    console.error("fetchMyProduct error:", error);
    return null;
  }
};

export const fetchUserProducts = async (
  id: string,
  accessToken: string | null,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    return await dachillaAPI.get<ProductInterface[]>(
      `products/user/${id}`,
      config,
    );
  } catch (error: any) {
    console.error("Error occurred", error);
    return null;
  }
};

export const updateMyProduct = async (
  id: string,
  accessToken: string | null,
  credentials: ProductInterface | null,
  imagesData: FormData,
  deletingImages: string[],
) => {
  if (credentials) {
    delete (credentials as Partial<ProductInterface>).images;
    credentials.price.amount = Number(credentials.price.amount);
    credentials.rooms = Number(credentials.rooms);
    credentials.contact.phone = Number(credentials.contact.phone);
  }
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
  console.log("🚀 ~ credentials:", credentials);
  try {
    const data = await safeAdminAxios<ProductInterface>(
      dachillaAPI.put<ProductInterface>(`products/${id}`, credentials, config),
    );
    console.log(data);
    if (data) {
      if (deletingImages.length > 0) {
        await safeAdminAxios<ProductInterface>(
          dachillaAPI.delete<ProductInterface>(
            `images/products/${data._id}`,
            {
              data: { imagePaths: deletingImages },
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            },
          ),
        );
      }
      if (imagesData) {
        await safeAdminAxios<ProductInterface>(
          dachillaAPI.post<ProductInterface>(
            `images/products/${data._id}`,
            imagesData,
            config_images,
          ),
        );
      }
    }
    return data;
  } catch (error: any) {
    console.error("updateMyProduct (admin) error:", error);
    return null;
  }
};

export const verifyProduct = async (id: string, accessToken: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    const { data } = await dachillaAPI.put<ProductInterface>(
      `products/${id}/activate`,
      {},
      config,
    );

    return data;
  } catch (error) {
    console.error("Error occurred during product verification", error);
    return null;
  }
};

export const disactiveProduct = async (
  id: string,
  accessToken: string | null,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    const { data } = await dachillaAPI.put<ProductInterface>(
      `products/${id}/disactivate`,
      {},
      config,
    );

    return data;
  } catch (error) {
    console.error("Error occurred during product disactivation", error);
    return null;
  }
};

export const deleteProduct = async (id: string, accessToken: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    const response = await dachillaAPI.delete(`products/${id}`, config);

    return response;
  } catch (error) {
    console.error("Error occurred during deleting product", error);
    return null;
  }
};

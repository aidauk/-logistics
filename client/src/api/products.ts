import { PaginatedProducts, ProductInterface } from "@/interfaces";
import { dachillaAPI, safeAxios } from "@/lib";
import {
  fetchProductFailure,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductReset,
} from "@/redux/features/products/slices/product.slice";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
} from "@/redux/features/products/slices/products.slice";
import { AppThunk } from "@/redux/store";

export const fetchProducts =
  (filters?: string): AppThunk =>
  async (dispatch) => {
    dispatch(fetchProductsStart());

    try {
      const data = await safeAxios<PaginatedProducts>(
        dachillaAPI.get<PaginatedProducts>(`/products/filter?${filters}`)
      );
      dispatch(fetchProductsSuccess(data));
    } catch (error: any) {
      dispatch(fetchProductsFailure(error.message));
    }
  };

export const fetchFavorites =
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    dispatch(fetchProductsStart());

    try {
      const favorites = await safeAxios<ProductInterface[]>(
        dachillaAPI.get<ProductInterface[]>(`/products/favorites`, config)
      );

      dispatch(
        fetchProductsSuccess({
          products: favorites,
          count: 0,
          page: 0,
          pageSize: 0,
          pages: 0,
        })
      );
    } catch (error: any) {
      dispatch(fetchProductsFailure(error.message));
    }
  };

export const fetchProduct =
  (id: string): AppThunk =>
  async (dispatch): Promise<any> => {
    dispatch(fetchProductStart());
    try {
      const product = await safeAxios<ProductInterface>(
        dachillaAPI.get<ProductInterface>(`products/${id}/activated`)
      );
      dispatch(fetchProductSuccess(product));
    } catch (error: any) {
      dispatch(fetchProductFailure(error.message));
    }
  };

export const productReset = (): AppThunk => async (dispatch) => {
  dispatch(fetchProductReset());
};

export const addReview =
  (
    accessToken: string,
    id: string,
    formData: FormData,
    rating: number
  ): AppThunk =>
  async (dispatch) => {
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const comment = formData.get("comment") as string;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };
    dispatch(fetchProductStart());
    try {
      const updated = await safeAxios<ProductInterface>(
        dachillaAPI.put<ProductInterface>(
          `products/${id}/review`,
          {
            name,
            city,
            comment,
            rating,
          },
          config
        )
      );
      dispatch(fetchProductSuccess(updated));
    } catch (error: any) {
      dispatch(fetchProductFailure(error.message));
    }
  };

export const addProduct = async (
  formData: FormData,
  accessToken: string,
  imagesData: FormData
) => {
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const phone = Number(formData.get("phone") as string);
  const city = formData.get("city") as string;
  const district = formData.get("district") as string;
  const street = formData.get("street") as string;
  const details = formData.get("details") as string;
  const special = JSON.parse(formData.get("comforts_special") as string);
  const additional = formData.get("additional") as string;
  const description = formData.get("description") as string;
  const currency = formData.get("currency") as string;
  const amount = Number(formData.get("amount"));
  const rooms = Number(formData.get("rooms") as string);
  const category = localStorage.getItem("category");
  const operation_type = formData.get("operation_type") as string;
  const fullname = localStorage.getItem("fullname");
  const email = localStorage.getItem("email");
  const phone2 = Number(localStorage.getItem("phone"));

  console.log("adding a product");
  try {
    const created = await safeAxios<ProductInterface>(
      dachillaAPI.post<ProductInterface>(
        `products/create`,
        {
          user_details: {
            fullname,
            email,
            phone: phone2,
          },
          rooms,
          price: {
            currency,
            amount,
          },
          category,
          description,
          comforts: {
            special,
            additional,
          },
          operation_type,
          address: {
            city,
            district,
            street,
            details,
          },
          contact: {
            username,
            phone,
          },
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
    );

    if (imagesData && created) {
      await safeAxios<ProductInterface>(
        dachillaAPI.post<ProductInterface>(
          `images/products/${created._id}`,
          imagesData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
      );
    }

    return created;
  } catch (error: any) {
    console.error("addProduct error:", error);
    return null;
  }
};

export const fetchMyProducts =
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch(fetchProductsStart());
    try {
      console.log("requesting to get my products2");
      const { data } = await dachillaAPI.get<ProductInterface[]>(
        `products/my`,
        config
      );
      dispatch(
        fetchProductsSuccess({
          page: 1,
          pages: 1,
          products: data,
          count: 0,
          pageSize: 18,
        })
      );
      return;
    } catch (error: any) {
      dispatch(fetchProductsFailure(error.message));
      return error;
    }
  };

export const fetchMyProduct = async (id: string) => {
  try {
    return await safeAxios<ProductInterface>(
      dachillaAPI.get<ProductInterface>(`products/${id}`)
    );
  } catch (error: any) {
    console.error("fetchMyProduct error:", error);
    return null;
  }
};

export const updateMyProduct = async (
  id: string,
  accessToken: string,
  credentials: ProductInterface | null,
  imagesData: FormData,
  deletingImages: string[]
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
  try {
    const updated = await safeAxios<ProductInterface>(
      dachillaAPI.put<ProductInterface>(`products/${id}`, credentials, config)
    );
    console.log(updated);
    if (updated) {
      if (deletingImages.length > 0) {
        await safeAxios<ProductInterface>(
          dachillaAPI.delete<ProductInterface>(`images/products/${updated._id}`, {
            data: { imagePaths: deletingImages },
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
        );
      }
      if (imagesData) {
        await safeAxios<ProductInterface>(
          dachillaAPI.post<ProductInterface>(
            `images/products/${updated._id}`,
            imagesData,
            config_images
          )
        );
      }
    }
    return updated;
  } catch (error: any) {
    console.error("updateMyProduct error:", error);
    return null;
  }
};

export const deleteProduct = async (
  accessToken: string,
  id: string
): Promise<boolean> => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  console.log("deleting product", accessToken, id);
  try {
    const response = await dachillaAPI.delete<ProductInterface>(
      `products/${id}`,
      config
    );
    if (response.status == 200) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return false;
  }
};

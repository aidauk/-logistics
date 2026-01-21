import { OrderInterface } from "@/interfaces";
import { dachillaAPI } from "@/lib";

export const fetchOrders = async (accessToken: string | null) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    console.log("requesting to get products");
    const { data } = await dachillaAPI.get<OrderInterface[]>(`/orders`, config);
    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
  }
};

export const fetchOrder = async (accessToken: string | null, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    console.log("requesting to get an order");
    const { data } = await dachillaAPI.get<OrderInterface>(
      `/orders/${id}`,
      config,
    );
    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
  }
};

export const cancelOrder = async (accessToken: string | null, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    console.log("requesting to cancel the order");
    const { data } = await dachillaAPI.put<OrderInterface>(
      `/orders/${id}/cancel`,
      {},
      config,
    );
    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
  }
};

export const archiveOrder = async (accessToken: string | null, id: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    console.log("requesting to cancel the order");
    const { data } = await dachillaAPI.put<OrderInterface>(
      `/orders/${id}/archive`,
      {},
      config,
    );
    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
  }
};

export const payOrder = async (accessToken: string | null, orderId: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  try {
    const { data } = await dachillaAPI.put(
      `/orders/${orderId}/pay`,
      {
        paymentId: "66031762b982b9f8dfd30706",
      },
      config,
    );
    return data;
  } catch (error: any) {
    console.error("🚀 ~ error:", error);
  }
};

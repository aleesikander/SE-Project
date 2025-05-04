import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include", // Include credentials if needed
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Adjust as necessary for your token storage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // Place an order
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/place-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    // Fetch orders for the logged-in buyer
    getMyOrders: builder.query({
      query: () => `/my-orders`, // No parameters needed; just call the endpoint
      providesTags: ["Order"],
    }),

    // Fetch orders received by the seller
    getSellerOrders: builder.query({
      query: ({ sellerId, page = 1, limit = 10 }) =>
        `/seller/${sellerId}?page=${page}&limit=${limit}`,
      providesTags: ["Order"],
    }),

    // Update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    // Fetch all orders (if needed)
    fetchAllOrders: builder.query({
      query: () => `/`,
      providesTags: ["Order"],
    }),
  }),
});

// Export the hooks for use in components
export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery, // For fetching buyer's orders
  useGetSellerOrdersQuery,
  useUpdateOrderStatusMutation,
  useFetchAllOrdersQuery,
} = orderApi;

export default orderApi;

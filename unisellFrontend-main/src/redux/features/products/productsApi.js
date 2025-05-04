import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category = "",
        color = "",
        minPrice = 0,
        maxPrice = "",
        page = 1,
        limit = 10,
      } = {}) => {
        const queryParams = new URLSearchParams({
          category,
          color,
          minPrice: minPrice.toString(),
          maxPrice,
          page: page.toString(),
          limit: limit.toString(),
        }).toString();

        return `/?${queryParams}`;
      },
      providesTags: ["Products"],
    }),

    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    addProduct: builder.mutation({
      query: (newProduct) => {
        const token = localStorage.getItem("token");
        return {
          url: "/create-product",
          method: "POST",
          body: newProduct,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => {
        const token = localStorage.getItem("token");
        return {
          url: `update-product/${id}`,
          method: "PATCH",
          body: rest,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem("token");
        return {
          url: `/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // New endpoint to fetch products by seller ID
    fetchProductsBySellerId: builder.query({
      query: ({ sellerId, page = 1, limit = 10 }) =>
        `/seller/${sellerId}?page=${page}&limit=${limit}`, // Modify the endpoint to match your route
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchProductsBySellerIdQuery, // Export the new hook
} = productsApi;

export default productsApi;

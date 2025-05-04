import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Revenue", "Admin"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Admin"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User", "Admin"],
    }),
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "/edit-profile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),
    getTotalRevenue: builder.query({
      query: () => ({
        url: "/admin/sellers/revenue",
        method: "GET",
      }),
      providesTags: ["Revenue"],
    }),

    // Admin-specific endpoints
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/admin/users",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["Admin"],
    }),
    deactivateUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/deactivate`,
        method: "PUT",
      }),
      invalidatesTags: ["Admin", "User"],
    }),
    updateUserPermissions: builder.mutation({
      query: ({ userId, permissions }) => ({
        url: `/admin/users/${userId}/permissions`,
        method: "PUT",
        body: { permissions },
      }),
      invalidatesTags: ["Admin", "User"],
    }),
    getAdminStats: builder.query({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getFlaggedUsers: builder.query({
      query: () => ({
        url: "/admin/users/flagged",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    banUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/ban`,
        method: "PUT",
      }),
      invalidatesTags: ["Admin", "User"],
    }),
    getPendingApprovals: builder.query({
      query: () => ({
        url: "/admin/approvals/pending",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
  useGetTotalRevenueQuery,

  // Admin hooks
  useGetAllUsersQuery,
  useDeactivateUserMutation,
  useUpdateUserPermissionsMutation,
  useGetAdminStatsQuery,
  useGetFlaggedUsersQuery,
  useBanUserMutation,
  useGetPendingApprovalsQuery,
} = authApi;

export default authApi;

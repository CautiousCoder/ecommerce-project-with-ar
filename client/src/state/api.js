import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Dashboard",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Category",
    "ProductCategory",
    "Home",
    "AllPostByCategory",
  ],
  endpoints: (build) => ({
    // front-end route
    getHomeData: build.query({
      query: () => "frontend/home",
      providesTags: ["Home"],
    }),

    // get all post under a category
    getAllPostByCategory: build.query({
      // query: (id) => `frontend/home/category?id=${id}`,
      query: (id) => ({
        url: "frontend/home/category",
        method: "GET",
        params: { id },
      }),
      /* method: "GET",
        params: { id }, */
      // providesTags: ["AllPostByCategory"],
    }),

    // for general route
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),

    // for client route
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    // get category
    getCategory: build.query({
      query: () => "client/products/category",
      providesTags: ["Category"],
    }),
    getProductCategory: build.query({
      query: () => "client/products/addProduct",
      providesTags: ["ProductCategory"],
    }),

    // for sales route
    getSales: build.query({
      query: () => "sales/overview",
      providesTags: ["Sales"],
    }),

    // for admin route
    getAdmins: build.query({
      query: () => "management/users",
      providesTags: ["Admins"],
    }),
    getPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetDashboardQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetCategoryQuery,
  useGetProductCategoryQuery,
  useGetHomeDataQuery,
  useGetAllPostByCategoryQuery,
} = api;

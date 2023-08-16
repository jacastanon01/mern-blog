import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isRejectedWithValue } from "@reduxjs/toolkit";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://mern-blog-btbu.onrender.com"
      : "/api",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Blog"], // Has to do with caching, can add products or blog points as tagTypes
  endpoints: (builder) => ({}),
});

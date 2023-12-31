import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://mern-blog-btbu.onrender.com/api"
    : "/api";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Blog"], // Has to do with caching, can add products or blog points as tagTypes
  endpoints: (builder) => ({}),
});

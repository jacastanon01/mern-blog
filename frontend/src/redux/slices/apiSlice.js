import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({baseUrl: "/api"})

export const apiSlice = createApi({
    baseQuery, 
    tagTypes: ["User"], // Has to do with caching, can add products or blog points as tagTypes
    endpoints: (builder) => ({})
})
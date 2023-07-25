import { apiSlice } from "./apiSlice";

const BLOGS_URL = "/blogs"

export const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => BLOGS_URL,
            providesTags: ["Blog"]
        }),
        getUserBlogs: builder.query({
            query: (data) => `${BLOGS_URL}/user/${data.userId}`,
            providesTags: ["Blog"]
        }),
        createNewBlog: builder.mutation({
            query: (data) => ({
                url: BLOGS_URL,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Blog"]
        }),
        getSingleBlog: builder.query({
            query: (data) => `${BLOGS_URL}/${data.blogId}`,
            providesTags: ["Blog"]
            
        }),
        updateBlog: builder.mutation({
            query: (data) => ({
                url: `${BLOGS_URL}/${data.blogId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Blog"]
        }),
        deleteBlog: builder.mutation({
            query: (data) => ({
                url: `${BLOGS_URL}/${data.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Blog"]
        })
    }),
})

export const { useGetBlogsQuery, useGetUserBlogsQuery, useDeleteBlogMutation, useCreateNewBlogMutation, useGetSingleBlogQuery, useUpdateBlogMutation } = blogsApiSlice
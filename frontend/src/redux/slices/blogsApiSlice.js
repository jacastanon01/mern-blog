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
            providesTags: ["Blog"],
            
            // invalidatesTags: (result, error, arg) => result
            async onQueryStarted(args, { queryFulfilled, dispatch}){
                try {
                    const { data } = await queryFulfilled
                    console.log("onQueryStarted async ", data, args) // need to set author as tag?
                } catch (error) {
                    console.log(error)
                }
            }
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
            // invalidatesTags: (result, err, arg) => [{type: "Blog", id: arg.d}] 
        }),
        deleteBlog: builder.mutation({
            query: (data) => ({
                url: `${BLOGS_URL}/${data.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Blog"]
            // invalidatesTags: (result, error, args) => result ? result?.blogs.map(({_id}) => ({type: "Blog", id: _id})) : ["Blog"]
        })
    }),
})

export const { useGetBlogsQuery, useGetUserBlogsQuery, useDeleteBlogMutation, useCreateNewBlogMutation, useGetSingleBlogQuery, useUpdateBlogMutation } = blogsApiSlice
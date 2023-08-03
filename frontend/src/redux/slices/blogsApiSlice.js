import { apiSlice } from "./apiSlice";

const BLOGS_URL = "/blogs";

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => BLOGS_URL,
      providesTags: ["Blog"],
    }),
    getUserBlogs: builder.query({
      query: (data) => `${BLOGS_URL}/user/${data.userId}`,
      //providesTags: (result, error, arg) => result ? result.blogs.map(blog => ({type: "Blog", id: blog._id})) : ["Blog"],
      providesTags: ["Blog"],
      // invalidatesTags: (result, error, arg) => result ? result.blogs.map(blog => ({type: "Blog", id: blog._id})) : ["Blog"]
      // async onQueryStarted(args, { queryFulfilled, dispatch}){
      //     try {
      //         const { data } = await queryFulfilled
      //         console.log("onQueryStarted async ", data, args) // need to set author as tag?
      //     } catch (error) {
      //         console.log(error)
      //     }
      // }
    }),
    createNewBlog: builder.mutation({
      query: (data) => ({
        url: BLOGS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    getSingleBlog: builder.query({
      query: (data) => `${BLOGS_URL}/${data.blogId}`,
      providesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
      // invalidatesTags: (result, err, arg) => [{type: "Blog", id: arg.d}]
    }),
    deleteBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.id}`,
        method: "DELETE",
      }),
      // onQueryStarted: async (args, {queryFulfilled, dispatch}) => {
      //     try {
      //         await queryFulfilled
      //         console.log(args)

      //         dispatch(
      //             blogsApiSlice.util.updateQueryData("getBlogs", undefined, (draft) => {
      //                 console.log(draft)
      //                 return draft?.filter(blog => blog._id !== args.id)
      //             })
      //         )
      //     } catch (error) {

      //     }
      // }
      invalidatesTags: ["Blog"],
      // invalidatesTags: (result, error, arg) => result ? result.blogs.map(blog => ({type: "Blog", id: blog._id})) : ["Blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetUserBlogsQuery,
  useDeleteBlogMutation,
  useCreateNewBlogMutation,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} = blogsApiSlice;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetBlogsQuery } from "./blogsApiSlice";

const initialState = {
    myBlogs: localStorage.getItem("myBlogs") ? JSON.parse(localStorage.getItem("myBlogs")) : null
}

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (data) => {
  console.log("DATA:", data)
  const { blogs } = data
  return blogs
})

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle",
    error: null
  },
  reducers: {
    setBlog(state, action) {
      state.blogs.map(blog => {
        if (blog._id === action.payload.blogId){
            return action.payload
        }
        return blog
      })
      //localStorage.setItem("myBlogs", updatedPosts)
      // state.blogs = updatedPosts
    },
    addBlog(state, action) {
      const { newBlog } = action.payload
      // console.log(state.blogs, newBlog)
      // const updatedBlogs = localStorage.getItem("myBlogs") ? [...JSON.parse(localStorage.getItem("myBlogs")), newBlog] : [newBlog]
      // localStorage.setItem("myBlogs", JSON.stringify(updatedBlogs))
      state.blogs = [...state.blogs, newBlog]
    },
    removeBlog(state, action){
        return state.blogs.filter(blog => blog._id !== action.payload._id)
        // state.blogs = filtered
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = "pending"
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "fulfilled"
        state.blogs = action.payload
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.error.message
      })
  },
});

export const { setBlog, addBlog, removeBlog } = blogsSlice.actions;

export default blogsSlice.reducer;

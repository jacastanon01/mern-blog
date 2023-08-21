import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetBlogsQuery } from "./blogsApiSlice";

const initialState = {
  myBlogs: localStorage.getItem("myBlogs")
    ? JSON.parse(localStorage.getItem("myBlogs"))
    : null,
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (data) => {
  console.log("DATA:", data);
  const { blogs } = data;
  return blogs;
});

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
    addBlog(state, action) {
      const { newBlog } = action.payload;
      state.blogs = [...state.blogs, newBlog];
    },
    removeBlog(state, action) {
      state.blogs = state.blogs.filter(
        (blog) => blog._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { setBlogs, addBlog, removeBlog } = blogsSlice.actions;

export default blogsSlice.reducer;

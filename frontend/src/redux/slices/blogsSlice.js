import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogPosts: localStorage.getItem("blogPosts")
    ? JSON.parse(localStorage.getItem("blogPosts"))
    : null,
};

const blogsSlice = createSlice({
  name: "blogPosts",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const update = state.find(blog => blog._id === action.payload._id)
      if (update){
        state.blogPosts.title = action.payload.title
        state.blogPosts.body = action.payload.body
      }
    },
    addBlog(state, action) {
      state.blogPosts.push(action.payload);
    },
    deleteBlogs(state, action){
        return state.blogPosts.filter(blog => blog._id !== action.blogId)
    }
  },
});

export const { setBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;

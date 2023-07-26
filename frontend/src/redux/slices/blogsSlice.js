import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: localStorage.getItem("myBlogs") ? JSON.parse(localStorage.getItem("myBlogs")) : null
}

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlog(state, action) {
      const updatedPosts = state.blogs.map(blog => {
        if (blog._id === action.payload.blogId){
            return action.payload
        }
        return blog
      })
      localStorage.setItem("myBlogs", updatedPosts)
      state.blogs = updatedPosts
    },
    addBlog(state, action) {
        state.push(action.payload.blogs);
        const updatedBlogs = localStorage.getItem("myBlogs") ? [...JSON.parse(localStorage.getItem("myBlogs")), action.payload.blogs] : [action.payload.blogs]
        localStorage.setItem("myBlogs", JSON.stringify(updatedBlogs))
    },
    removeBlog(state, action){
        state.filter(blog => blog._id !== action.payload.blogId)
    }
  },
});

export const { setBlog, addBlog, removeBlog } = blogsSlice.actions;

export default blogsSlice.reducer;

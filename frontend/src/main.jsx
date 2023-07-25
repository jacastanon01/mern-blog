import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Hero from "./components/Hero.jsx";
import LoginPage from "./pages/userPages/LoginPage.jsx";
import CreateBlog from "./pages/blogPages/CreateBlog.jsx";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/userPages/RegisterPage.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import ProfilePage from "./pages/userPages/ProfilePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SingleBlog from "./components/blog/SingleBlog.jsx";
import { useGetSingleBlogQuery } from "./redux/slices/blogsApiSlice.js";
import MyBlogs from "./components/blog/MyBlogs.jsx";
import EditBlog from "./pages/blogPages/EditBlog.jsx";
import UserBlogs from "./components/blog/UserBlogs.jsx";

async function blogLoader(blogId) {
  console.log(blogId);
  //return "Hello";
  try {
    const [getSingleBlog] = useGetSingleBlogQuery({ id: blogId });
    const res = await getSingleBlog({ id: blogId }).unwrap();
    console.log(JSON.stringify(res));
    return data;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="blog">
          <Route path="123" element={<h1>Test</h1>} />
          <Route path="myblogs" element={<MyBlogs />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path="edit" element={<EditBlog />} />
          <Route
            path=":blogId"
            element={<EditBlog />}
            //loader={async ({ params }) => await blogLoader(params.blogId)}
          />
          <Route path="user/:userId" element={<UserBlogs />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

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
import RegisterPage from "./pages/userPages/RegisterPage.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import ProfilePage from "./pages/userPages/ProfilePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import MyBlogs from "./components/blog/MyBlogs.jsx";
import SingleBlog from "./pages/blogPages/SingleBlog.jsx";
import UserBlogs from "./components/blog/UserBlogs.jsx";
import BlogFeed from "./components/blog/BlogFeed.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Hero />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="blog">
          <Route index element={<BlogFeed />} />
          <Route path="myblogs" element={<MyBlogs />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path="edit" element={<SingleBlog />} />
          <Route path=":blogId" element={<SingleBlog />} />
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

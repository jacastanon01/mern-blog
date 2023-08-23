import React from "react";
import Hero from "../components/Hero";
import { useSelector } from "react-redux";
import BlogFeed from "./blogPages/BlogFeed";

function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <BlogFeed /> : <Hero />;
}

export default HomePage;

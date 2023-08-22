import React from "react";
import { Row } from "react-bootstrap";
import { useGetUserBlogsQuery } from "../../redux/slices/blogsApiSlice";
import { LoadingSpinner } from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import SingleBlogCard from "./SingleBlogCard";
import { useSelector, useDispatch } from "react-redux";

function MyBlogs() {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading, isFetching, isError } = useGetUserBlogsQuery({
    userId: userInfo._id,
  });

  console.log("MY BLOGS", data, userInfo);

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <Row>
      <h1 className="text-center mb-4">MY BLOGS</h1>

      {data && data?.blogs.length > 0 && !isError ? (
        data?.blogs.map((post) => (
          <SingleBlogCard data={post} name={data?.name} key={post._id} />
        ))
      ) : (
        <div>
          You haven't posted any blogs yet!{" "}
          <LinkContainer
            style={{ cursor: "pointer", textDecoration: "underline" }}
            to="/blog/create"
          >
            <strong>Click here</strong>
          </LinkContainer>{" "}
          to create one
        </div>
      )}
    </Row>
  );
}

export default MyBlogs;

import React from "react";
import { Col, Row } from "react-bootstrap";
import { useGetUserBlogsQuery } from "../../redux/slices/blogsApiSlice";
import { LoadingSpinner } from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import BlogCard from "./BlogCard";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { useDeleteBlogMutation } from "../../redux/slices/blogsApiSlice";

function MyBlogs() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, isFetching, isError } = useGetUserBlogsQuery({
    userId: userInfo._id,
  });
  const [deleteBlog] = useDeleteBlogMutation();

  async function handleDelete(id) {
    await deleteBlog({ id }).unwrap(); // delete from db
  }

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  const bodyStyles = { display: "flex" };
  return (
    <Row>
      <h1 className="text-center mb-4">MY BLOGS</h1>
      {data && data?.blogs.length > 0 ? (
        data?.blogs.map((post) => {
          const bodyContent = post && (
            <>
              <p style={userInfo ? { flex: 1 } : null}>
                {post?.body.length > 80
                  ? `${post?.body.slice(0, 80)}...`
                  : post?.body}
              </p>{" "}
              {userInfo._id === post?.author._id && (
                <div>
                  <LinkContainer
                    className="mx-2"
                    to={`/blog/${post?._id}`}
                    style={{
                      border: "none",
                      color: "white",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <FaEdit />
                  </LinkContainer>
                  <button
                    style={{
                      border: "none",
                      color: "white",
                      background: "none",
                    }}
                    onClick={() => handleDelete(post?._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              )}
            </>
          );

          return (
            <Col sm={12} md={6} lg={4} key={post._id}>
              <BlogCard
                post={post}
                title={<h1>{post.title}</h1>}
                body={bodyContent}
                styles={{ bodyStyles }}
              />
            </Col>
          );
        })
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

import React from "react";
import { Button, Row, Card, Col } from "react-bootstrap";
import { useGetBlogsQuery } from "../../redux/slices/blogsApiSlice";
import BlogCard from "../../components/blog/BlogCard";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function BlogFeed() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetBlogsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Row>
      <h1 className="text-center">Community Feed</h1>

      {data?.blogs && data.blogs.length > 0 ? (
        data.blogs.map((post) => {
          const titleContent = (
            <>
              <h2 className="mb-0">{post.title}</h2>
              <p style={{ fontSize: "0.8rem" }}>
                Written by:{" "}
                {post?.author?._id === userInfo._id ? (
                  <LinkContainer style={{ cursor: "pointer" }} to={"myblogs"}>
                    <b className="text-capitalize">{post?.author?.name}</b>
                  </LinkContainer>
                ) : (
                  <LinkContainer
                    style={{ cursor: "pointer" }}
                    to={`user/${post?.author?._id.toString()}`}
                  >
                    <b className="text-capitalize">{post?.author?.name}</b>
                  </LinkContainer>
                )}
              </p>
            </>
          );

          const bodyContent = (
            <div className="text-center">
              <p className="fs-6">
                {post.body.length > 20
                  ? `${post.body.slice(0, 20)}...`
                  : post.body}
              </p>

              <LinkContainer to={`${post._id}`}>
                <Button>Go to post</Button>
              </LinkContainer>
            </div>
          );
          return (
            <Col xl={4} md={6} xs={12} className="mt-4" key={post?._id}>
              <BlogCard post={post} body={bodyContent} title={titleContent} />
            </Col>
          );
        })
      ) : (
        <div>No blogs</div>
      )}
    </Row>
  );
}

export default BlogFeed;

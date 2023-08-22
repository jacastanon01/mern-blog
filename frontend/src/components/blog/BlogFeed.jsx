import React from "react";
import { Button, Row, Card, Col } from "react-bootstrap";
import { useGetBlogsQuery } from "../../redux/slices/blogsApiSlice";
import BlogCard from "./BlogCard";
import { LoadingSpinner } from "../LoadingSpinner";
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
        data.blogs.map((post) => (
          <Col lg={4} sm={10} className="mt-4" key={post?._id}>
            {post && !isLoading && (
              <Card className="">
                <Card.Title className="text-center mb-0">
                  <h1>{post.title}</h1>
                  <p style={{ fontSize: "1rem" }}>
                    Written by:{" "}
                    {post?.author?._id === userInfo._id ? (
                      <LinkContainer
                        style={{ cursor: "pointer" }}
                        to={"myblogs"}
                      >
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
                </Card.Title>
                <Card.Body>
                  <div className="text-center">
                    <p>
                      {post.body.length > 10
                        ? `${post.body.slice(0, 40)}...`
                        : post.body}
                    </p>

                    <LinkContainer to={`${post._id}`}>
                      <Button>Go to post</Button>
                    </LinkContainer>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))
      ) : (
        <div>No blogs</div>
      )}
    </Row>
  );
}

export default BlogFeed;

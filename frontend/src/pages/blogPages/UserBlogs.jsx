import React from "react";
import { Button, Row, Card, Col } from "react-bootstrap";
import { useGetUserBlogsQuery } from "../../redux/slices/blogsApiSlice";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import BlogCard from "../../components/blog/BlogCard";

function UserBlogs() {
  const { userId } = useParams();
  console.log("USER ", userId);
  const { data, isLoading } = useGetUserBlogsQuery({ userId });
  const user = data?.blogs && data?.blogs[0].author.name;

  if (isLoading) return <LoadingSpinner />;
  return (
    <Row>
      {data && data?.blogs.length > 0 ? (
        <>
          <h1 className="text-center">
            {user && user[0].toUpperCase()}
            {user && user.substring(1, user.length)}
            's Blog
          </h1>
          {data?.blogs?.map((post) => {
            const bodyContent = (
              <div className="text-center">
                <p>
                  {post.body.length > 10
                    ? `${post.body.slice(0, 10)}...`
                    : post.body}
                </p>

                <LinkContainer to={`../${post._id}`}>
                  <Button>Go to post</Button>
                </LinkContainer>
              </div>
            );
            return (
              <Col lg={4} md={6} sm={12} className="mt-2" key={post._id}>
                <BlogCard
                  post={post}
                  body={bodyContent}
                  title={<h1>{post.title}</h1>}
                />
              </Col>
            );
          })}
        </>
      ) : (
        <div>This user hasn't written anything blogs yet</div>
      )}
    </Row>
  );
}

export default UserBlogs;

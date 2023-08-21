import React from "react";
import { Button, Row, Card, Col } from "react-bootstrap";
import { useGetUserBlogsQuery } from "../../redux/slices/blogsApiSlice";
import { LoadingSpinner } from "../LoadingSpinner";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

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
          {data?.blogs?.map((blog) => {
            return (
              <Col lg={4} sm={10} className="mt-2" key={blog._id}>
                <Card className="">
                  <Card.Title className="text-center mb-0">
                    <h1>{blog.title}</h1>
                  </Card.Title>
                  <Card.Body>
                    {/* <h1 className="text-center">{post.title}</h1> */}
                    <div className="text-center">
                      <p>
                        {blog.body.length > 10
                          ? `${blog.body.slice(0, 10)}...`
                          : blog.body}
                      </p>

                      <LinkContainer to={`../${blog._id}`}>
                        <Button>Go to post</Button>
                      </LinkContainer>
                    </div>
                  </Card.Body>
                </Card>
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

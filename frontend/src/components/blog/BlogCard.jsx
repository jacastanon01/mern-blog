import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { formatISO9075 } from "date-fns";

function BlogCard({ post, author }) {
  //const styles = localStorage.getItem("userInfo") ? { flex: 1 } : null;
  console.log("POST", post);
  return (
    post && (
      <Container className="mt-5">
        <Row className="d-flex w-100 h-100 align-center-center justify-content-center ">
          <Col xs={12} md={6}>
            <Card style={{ border: "none", outline: "none", height: "100%" }}>
              <Card.Title
                className="text-center"
                style={{
                  borderBottom: "1px solid white",
                  paddingBottom: "0.5em",
                }}
              >
                <h1 className="text-uppercase">{post?.title}</h1>
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                  <div className="mb-2">
                    Written by:
                    <LinkContainer
                      to={`../user/${post.author._id}`}
                      style={{ cursor: "pointer" }}
                    >
                      <span className=" ms-2 text-capitalize text-decoration-underline">
                        {post.author.name}
                      </span>
                    </LinkContainer>
                  </div>
                  <time style={{ fontSize: "0.7rem", flex: 1 }}>
                    {formatISO9075(new Date(post?.createdAt))}
                  </time>
                </div>
              </Card.Title>

              <Card.Body
                style={{ height: "30vh", fontSize: "1.5em" }}
                // className="d-flex flex-column justify-content-center"
              >
                {/* <div
                  style={{
                    //   background: "#eee",
                    //   color: "black",
                    // height: "100%",
                    padding: "0.5rem 1rem",
                    fontSize: "2em",
                  }}
                  // className="card-body-display"
                > */}
                {post?.body}
                {/* </div> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  );
}

export default BlogCard;

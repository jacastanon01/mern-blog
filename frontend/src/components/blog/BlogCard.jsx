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
      <Card
        style={{
          // border: "0.2em double #eee",
          outline: "none",
          height: "100%",
          boxShadow: "rgba(255, 255, 255, 0.1) 4px 4px 12px 12px",
        }}
      >
        <Card.Title
          className="text-center"
          style={{
            borderBottom: "1px solid white",
            paddingBottom: "0.5em",
            background: "var(--primary)",
          }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <h1 className="text-uppercase">{post?.title}</h1>
            <div className="mb-2 w-50 ms-auto" style={{ fontSize: "0.7em" }}>
              <span>Written by:</span>
              <LinkContainer
                to={`../user/${post.author._id}`}
                style={{ cursor: "pointer" }}
              >
                <span className=" ms-2 text-capitalize text-decoration-underline">
                  {post.author.name}
                </span>
              </LinkContainer>
              <time style={{ fontSize: "0.7rem", display: "block" }}>
                {formatISO9075(new Date(post?.createdAt))}
              </time>
            </div>
          </div>
        </Card.Title>

        <Card.Body
          style={{
            height: "30vh",
            fontSize: "calc(1.35em + 1vw)",
          }}
          // className="d-flex flex-column justify-content-center"
        >
          {post?.body}
        </Card.Body>
      </Card>
    )
  );
}

function BlogCardTitle({ children, ...styles }) {
  return (
    <Card.Title
      className="text-center"
      style={{
        ...styles,
        borderBottom: "1px solid white",
        paddingBottom: "0.5em",
        background: "var(--primary)",
      }}
    >
      {children}
    </Card.Title>
  );
}

function BlogCardBody({ children, ...styles }) {
  <Card.Body style={{ ...styles }}>{children}</Card.Body>;
}

export default BlogCard;

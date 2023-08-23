import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { formatISO9075 } from "date-fns";

function BlogCard({
  post,
  author,
  styles,
  title,
  body,
  // ...cardStyles
}) {
  //const styles = localStorage.getItem("userInfo") ? { flex: 1 } : null;
  const { cardStyles, titleStyles, bodyStyles } = styles;
  console.log("POST", post);
  return (
    post && (
      <Card style={cardStyles}>
        <Card.Title className="text-center" style={titleStyles}>
          {title}
        </Card.Title>

        <Card.Body
          style={bodyStyles}
          // className="d-flex flex-column justify-content-center"
        >
          {body}
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

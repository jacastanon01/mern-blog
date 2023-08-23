import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { formatISO9075 } from "date-fns";

function BlogCard({
  post,
  styles,
  title,
  body,
  // ...cardStyles
}) {
  //const styles = localStorage.getItem("userInfo") ? { flex: 1 } : null;
  // const { cardStyles, titleStyles, bodyStyles } = styles;
  console.log("BODY", body);
  return (
    post && (
      <Card style={styles?.cardStyles}>
        <Card.Title className="text-center" style={styles?.titleStyles}>
          {title}
        </Card.Title>

        <Card.Body style={styles?.bodyStyles}>{body}</Card.Body>
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
  <Card.Body style={{ styles }}>{children}</Card.Body>;
}

export default BlogCard;

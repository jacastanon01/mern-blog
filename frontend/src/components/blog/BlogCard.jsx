import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

function BlogCard(post) {
  //const styles = localStorage.getItem("userInfo") ? { flex: 1 } : null;
  return (
    post && (
      <Card className="">
        <Card.Title className="text-center">
          <h1>{post.title}</h1>
          <p style={{ fontSize: "1rem" }}>
            Written by <b className="text-capitalize">{post?.author?.name}</b>
          </p>
        </Card.Title>
        <Card.Body>
          {/* <h1 className="text-center">{post.title}</h1> */}
          <div className="text-center">
            <p>{post.body}</p>

            <LinkContainer to={`blog/${post._id}`}>
              <Button>Go to post</Button>
            </LinkContainer>
          </div>
        </Card.Body>
      </Card>
    )
  );
}

export default BlogCard;

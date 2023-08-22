import React, { useState, useEffect } from "react";
import FormContainer from "../FormContainer";
import { Form, Row, Col, Button } from "react-bootstrap";
import {
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "../../redux/slices/blogsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "../../redux/slices/blogsApiSlice";
import { formatISO9075 } from "date-fns";

function EditForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [deleteBlog] = useDeleteBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const { data } = useGetSingleBlogQuery({ blogId });

  useEffect(() => {
    setTitle(data?.post.title);
    setBody(data?.post.body);
  }, [data?.post.title, data?.post.body]);

  async function handleSubmit(e) {
    e.preventDefault();
    await updateBlog({
      blogId: data?.post._id,
      title,
      body,
      author: data?.post?.author,
    }).unwrap();
    navigate("../myblogs");
  }
  async function handleDelete() {
    await deleteBlog({ id: blogId }).unwrap();
    navigate("../myblogs");
  }
  return (
    <>
      <h1 className="">Edit blog post</h1>

      <div className="inline-block">
        Last updated at:
        <time className="ms-2">
          {formatISO9075(new Date(data?.post.updatedAt))}
        </time>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3">
          <Form.FloatingLabel label="Title">
            <Form.Control
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
        <Form.Group>
          <Form.FloatingLabel label="Description">
            <Form.Control
              as="textarea"
              style={{ height: "200px" }}
              defaultValue={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
        <Row className="mt-2">
          <Col sm={6}>
            <Button className="mt-2 w-100" variant="primary" type="submit">
              Updated post
            </Button>
          </Col>
          <Col sm={6}>
            <Button onClick={handleDelete} className="w-100 mt-2">
              Delete post
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default EditForm;

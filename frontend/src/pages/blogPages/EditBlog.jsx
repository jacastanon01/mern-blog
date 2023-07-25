import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateBlogMutation,
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
} from "../../redux/slices/blogsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { LinkContainer } from "react-router-bootstrap";

function EditBlog() {
  const { blogId } = useParams();
  console.log(blogId);
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const { data, isLoading } = useGetSingleBlogQuery({ blogId });
  console.log(data);
  //const { post } = data;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  console.log(data?.post?.body);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setTitle(data?.post.title);
    setBody(data?.post.body);
  }, [data?.post.title, data?.post.body]);

  async function handleSubmit(e) {
    e.preventDefault();
    await updateBlog({ blogId: data?.post._id, title, body }).unwrap();
    navigate("../myblogs");
  }

  async function clearInput() {
    await deleteBlog({ id: blogId }).unwrap();
    navigate("../myblogs");
  }

  if (isLoading) return <LoadingSpinner />;
  return (
    data?.post && (
      <FormContainer>
        {!userInfo._id.toString() === data?.post.author.toString() ? (
          <>
            <h1 className="">Edit blog post</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="my-3">
                <Form.FloatingLabel label="Title">
                  <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              <Form.Group>
                <Form.FloatingLabel label="Description">
                  <Form.Control
                    as="textarea"
                    style={{ height: "200px" }}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Form.FloatingLabel>
              </Form.Group>
              <Row className="mt-2">
                <Col sm={6}>
                  <Button
                    className="mt-2 w-100"
                    variant="primary"
                    type="submit"
                  >
                    Updated post
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button onClick={clearInput} className="w-100 mt-2">
                    Delete post
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        ) : (
          <Card>
            <Card.Title style={{ borderBottom: "1px solid white" }}>
              <h1 className="text-center">{title}</h1>
            </Card.Title>

            <Card.Body
              // style={{ height: "20vh" }}
              className="d-flex justify-content-center"
            >
              <p
                style={{
                  //   background: "#eee",
                  //   color: "black",
                  height: "100%",
                  padding: "0.5rem 1rem",
                }}
              >
                <div>{body}</div>
                <LinkContainer to={`../user/${data?.post.author._id}`}>
                  <Button className="btn-primary my-3 align-self-end text-capitalize">
                    See More posts from {data?.post.author.name}
                  </Button>
                </LinkContainer>
              </p>
            </Card.Body>
          </Card>
        )}
      </FormContainer>
    )
  );
}

export default EditBlog;

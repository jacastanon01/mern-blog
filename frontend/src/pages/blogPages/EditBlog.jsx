import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { formatISO9075 } from "date-fns";
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

// TODO: Instead of a ternary, absract the editing content from the single post content into a separate component

function EditBlog() {
  const { blogId } = useParams();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const { data, isLoading, error } = useGetSingleBlogQuery(
    { blogId },
    { refetchOnMountOrArgChange: true }
  );
  console.log(data);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(data?.post);
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

  if (isLoading) return <LoadingSpinner />;
  if (error || !blogId) return <p>{error}</p>;
  return (
    data?.post && (
      <FormContainer>
        <article className="single-blog">
          {userInfo._id.toString() === data?.post?.author?._id.toString() ? (
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
                    <Button
                      className="mt-2 w-100"
                      variant="primary"
                      type="submit"
                    >
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
          ) : (
            <Card style={{ border: "none", outline: "none" }}>
              <Card.Title
                className="text-center"
                style={{ borderBottom: "1px solid white" }}
              >
                <h1 className="text-uppercase">{title}</h1>
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                  <div className="mb-2">
                    Written by:
                    <LinkContainer
                      to={`../user/${data?.post.author._id}`}
                      style={{ cursor: "pointer" }}
                    >
                      <span className=" ms-2 text-capitalize text-decoration-underline">
                        {data?.post.author.name}
                      </span>
                    </LinkContainer>
                  </div>
                  <time style={{ fontSize: "0.7rem", flex: 1 }}>
                    {formatISO9075(new Date(data?.post.createdAt))}
                  </time>
                </div>
              </Card.Title>

              <Card.Body
                // style={{ height: "20vh" }}
                className="d-flex flex-column justify-content-center"
              >
                <div
                  style={{
                    //   background: "#eee",
                    //   color: "black",
                    // height: "100%",
                    padding: "0.5rem 1rem",
                  }}
                  className="card-body-display"
                >
                  <div>{body}</div>
                </div>
              </Card.Body>
            </Card>
          )}
        </article>
      </FormContainer>
    )
  );
}

export default EditBlog;

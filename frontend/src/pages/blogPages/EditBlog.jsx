import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { formatISO9075 } from "date-fns";
import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, removeBlog } from "../../redux/slices/blogsSlice";
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
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const { data, isLoading, error } = useGetSingleBlogQuery(
    { blogId },
    { refetchOnMountOrArgChange: true }
  );
  console.log(data);
  //const { post } = data;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // const formatDateArr = formatISO9075(new Date(data?.post.updatedAt)).split(
  //   " "
  // );
  // console.log(formatDateArr);
  // const formatDate = formatDateArr.split(" ")[0];
  // const formatTimeArr = formatDate[1].split(":");
  // const formatHour =
  //   formatTimeArr[0] - 12 > 0
  //     ? (+formatDateArr[0] - 12).toString()
  //     : formatTimeArr[0];
  // console.log(formatHour);

  useEffect(() => {
    console.log(data?.post);
    setTitle(data?.post.title);
    setBody(data?.post.body);
    // const formatDateArr = data && formatISO9075(data?.post.updatedAt);
    // console.log(formatDateArr);
  }, [data?.post.title, data?.post.body]);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await updateBlog({
      blogId: data?.post._id,
      title,
      body,
      author: data?.post?.author,
    }).unwrap();
    dispatch(setBlog({ ...res }));
    navigate("../myblogs");
  }

  async function handleDelete() {
    await deleteBlog({ id: blogId }).unwrap();
    // dispatch(removeBlog({ ...res }));
    navigate("../myblogs");
  }

  if (isLoading) return <LoadingSpinner />;
  if (error || !blogId) return <p>{error}</p>;
  return (
    data?.post && (
      <FormContainer>
        {userInfo._id.toString() === data?.post?.author?._id.toString() ? (
          <>
            <h1 className="">Edit blog post</h1>

            {/* {new Date(formatDate).toLocaleDateString()} */}
            {/* <time>{formatISO9075(new Date(data?.post.createdAt))}</time> */}
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
          <Card>
            <Card.Title
              className="text-center"
              style={{ borderBottom: "1px solid white" }}
            >
              <h1 className="text-uppercase">{title}</h1>
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                Written by: {data?.post.author.name}
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
                  height: "100%",
                  padding: "0.5rem 1rem",
                }}
              >
                <div>{body}</div>
              </div>
              <LinkContainer to={`../user/${data?.post.author._id}`}>
                <Button className="btn-primary align-self-end text-capitalize">
                  See More posts from {data?.post.author.name}
                </Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        )}
      </FormContainer>
    )
  );
}

export default EditBlog;

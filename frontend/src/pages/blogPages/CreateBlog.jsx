import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import FormContainer from "../../components/FormContainer";
import { useDispatch } from "react-redux";
import { useCreateNewBlogMutation } from "../../redux/slices/blogsApiSlice";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createNewBlog] = useCreateNewBlogMutation();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createNewBlog({ title, body }).unwrap();
    console.log(res);
    navigate("/blog/myblogs");
  }

  function clearInput() {
    setTitle("");
    setBody("");
  }

  return (
    <FormContainer>
      <h1 className="">New blog post</h1>
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
            <Button className="mt-2 w-100" variant="primary" type="submit">
              Submit post
            </Button>
          </Col>
          <Col sm={6}>
            <Button onClick={clearInput} className="w-100 mt-2">
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default CreateBlog;

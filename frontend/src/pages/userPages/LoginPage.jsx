import { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/slices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

/* 
?   use react-bootstrap-toast instead 
?   create ToastWrapper component with bg set to either success or danger. Delay to 3000. 
?   autohide to true see if you can set the show attribute without state
?   invoke in all pages with validation 
*/

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: email.toLowerCase(),
        password,
      }).unwrap();
      console.log(JSON.stringify(res));
      dispatch(setCredentials({ ...res }));
      navigate("/blog");
    } catch (error) {
      toast.error(error?.data?.message || "Invalid credentials");
    }
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && (
          <Row>
            <LoadingSpinner />
          </Row>
        )}

        <Button type="submit" variant="primary" className="mt-2">
          Sign in
        </Button>
        <Row className="py-3">
          <Col>
            New customer? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default LoginPage;

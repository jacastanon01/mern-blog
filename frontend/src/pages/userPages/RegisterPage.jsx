import { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/slices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components/LoadingSpinner";

// ?  import FloatingLabel from 'react-bootstrap/FloatingLabel'; Place FloatingLabel where Input label is

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const linkToSignIn = <Link to="/login">Click here</Link>;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(password);
    const trimmedName = name.toString().trim();

    // TODO update validation
    if (confirmPassword !== password) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }
    if (name.length < 2) {
      toast.error("Name must be at least two characters");
      return;
    }
    try {
      const res = await register({
        name: name.toLocaleLowerCase(),
        email: email.toLowerCase(),
        password,
      }).unwrap(); // if you don't unwrap the promise, res return a data object with the JSON instead of just the JSON. Ask me how I know
      dispatch(setCredentials({ ...res }));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormContainer>
      <h1>Sign up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <LoadingSpinner />}

        <Button type="submit" variant="primary" className="mt-2">
          Sign in
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default RegisterPage;

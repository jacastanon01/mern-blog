import { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "../../redux/slices/usersApiSlice";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [updated, setUpdated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const linkToSignIn = <Link to="/login">Click here</Link>;

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.toString().trim();

    if (confirmPassword !== password || password.length < 4) {
      toast.error("Passwords do not match");
    } else {
      console.log(password + "\n" + confirmPassword);
      const res = await updateProfile({ name, email }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Updated profile!");
    }
  }

  return (
    <FormContainer>
      <h1>Update your profile</h1>
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
          Update
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ProfilePage;

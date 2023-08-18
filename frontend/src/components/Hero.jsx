import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";

function Hero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);

  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const heroButtons = userInfo ? (
    <>
      <LinkContainer>
        <Button variant="primary me-3" onClick={handleLogout}>
          Log out
        </Button>
      </LinkContainer>
      <LinkContainer to="profile">
        <Button variant="primary">Profile</Button>
      </LinkContainer>
    </>
  ) : (
    <>
      <LinkContainer to="login">
        <Button variant="primary me-3">Sign in</Button>
      </LinkContainer>
      <LinkContainer to="register">
        <Button variant="secondary">Register</Button>
      </LinkContainer>
    </>
  );

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column hero-card align-items-center  w-75">
          <h1 className="text-center mb-4">MERN Authentication Blog</h1>
          <p className="text-center mb-4">
            Blog application that authenticates users with Json Web Tokens and
            stores them in an http-only cookie. You will not be able to see any
            other users or their blogs until you register for an account. Once
            logged in, you can browse the blog posts of other users and create
            your own. Click below to signup!
          </p>
          <div className="d-flex">{heroButtons}</div>
        </Card>
      </Container>
    </div>
  );
}

export default Hero;

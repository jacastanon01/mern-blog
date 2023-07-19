import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/slices/usersApiSlice";

function Hero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const heroButtons = localStorage.getItem("userInfo") ? (
    <>
      <LinkContainer to="/">
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
          <h1 className="text-center mb-4">MERN Authentication</h1>
          <p className="text-center mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            nisi aut cum veritatis sequi porro dolor deleniti debitis
            consequuntur, dolorem earum nulla id blanditiis distinctio
            provident. Ducimus dignissimos ratione sequi.
          </p>
          <div className="d-flex">{heroButtons}</div>
        </Card>
      </Container>
    </div>
  );
}

export default Hero;

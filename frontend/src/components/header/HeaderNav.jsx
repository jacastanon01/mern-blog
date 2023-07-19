import { NavDropdown, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { clearCredentials } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap";

function HeaderNav() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return userInfo ? (
    <>
      <NavDropdown title={userInfo.name} id="username">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </>
  ) : (
    <>
      {" "}
      <LinkContainer to="/login">
        <Nav.Link>
          <FaSignInAlt className="me-1" />
          Sign in
        </Nav.Link>
      </LinkContainer>
      <LinkContainer to="/register">
        <Nav.Link>
          <FaSignOutAlt className="me-1" />
          Sign up
        </Nav.Link>
      </LinkContainer>
    </>
  );
}

export default HeaderNav;

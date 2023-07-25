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
    <Nav className="ms-auto me-5" style={{ width: "4rem" }}>
      <Nav.Item className="d-flex justify-content-center my-auto rounded-circle h-auto w-100 text-white btn-primary">
        {userInfo.name[0].toUpperCase()}
      </Nav.Item>
      <NavDropdown title={userInfo.name} id="username">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="blog/myblogs">
          <NavDropdown.Item>My Blogs</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="blog/create">
          <NavDropdown.Item>Add New Blog</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
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

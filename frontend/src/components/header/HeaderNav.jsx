import { NavDropdown, Nav, InputGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import { CgAdd } from "react-icons/cg";
import { clearCredentials } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { setTheme } from "../../redux/slices/themeSlice";
import { CiDark, CiLight } from "react-icons/ci";

function HeaderNav() {
  const { userInfo } = useSelector((state) => state.auth);
  const { isDark } = useSelector((state) => state.theme);
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

  const avatar = (
    <>
      <span className="my-auto text-white rounded-circle px-2 bg-dark me-1">
        {userInfo?.name[0].toUpperCase()}
      </span>
      <span>{userInfo?.name}</span>
    </>
  );

  const handleTheme = () => {
    dispatch(setTheme());
  };

  return (
    <Nav className="ms-auto">
      {userInfo ? (
        <>
          <Nav.Item>
            <Button
              style={{ border: "none", color: "white", marginLeft: "auto" }}
              onClick={handleTheme}
            >
              {isDark ? <CiDark /> : <CiLight />}
            </Button>
          </Nav.Item>
          <NavDropdown
            title={avatar}
            id="username"
            className="text-capitalize  d-flex align-items-end flex-column"
          >
            <LinkContainer to="/profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/blog/myblogs">
              <NavDropdown.Item>My Blogs</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/blog/create">
              <NavDropdown.Item>Add New Blog</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <>
          {" "}
          <LinkContainer to="/login">
            <Nav.Link>
              <FaSignInAlt className="" />
              Sign in
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/register">
            <Nav.Link>
              <FaSignOutAlt className="" />
              Sign up
            </Nav.Link>
          </LinkContainer>
        </>
      )}
    </Nav>
  );
}

export default HeaderNav;

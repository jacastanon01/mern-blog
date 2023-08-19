import { NavDropdown, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import { CgAdd } from "react-icons/cg";
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

  const avatar = (
    <>
      <span className="my-auto rounded-circle px-2 text-white btn-primary">
        {userInfo?.name[0].toUpperCase()}
        {/* <span className="rounded-circle px-2 py-1 text-white btn-primary">
              {userInfo.name[0].toUpperCase()}
            </span> */}
      </span>
      <span>{userInfo?.name}</span>
    </>
  );

  return (
    <Nav className="ms-auto d-flex align-items-end">
      {userInfo ? (
        <>
          <NavDropdown
            title={avatar}
            id="username"
            className="text-capitalize w-100"
          >
            <LinkContainer to="/profile">
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/blog/myblogs">
              <NavDropdown.Item>My blogs</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
          <LinkContainer to="/blog/create">
            <NavDropdown.Item className="h-100 align-self-center">
              Add New Blog
            </NavDropdown.Item>
          </LinkContainer>
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

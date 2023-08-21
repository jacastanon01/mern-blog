import { Container, Nav, Navbar, Badge, InputGroup } from "react-bootstrap";
import NavDropdown from "./HeaderNav";
import { LinkContainer } from "react-router-bootstrap";
import { toggleTheme } from "../../utils/ThemeContext";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { ImBlog } from "react-icons/im";

export function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <header>
      <Navbar className="navbar-dark" expand="lg" collapseOnSelect>
        <Container fluid="lg">
          {userInfo ? (
            <>
              <LinkContainer to="/blog">
                <Navbar.Brand>
                  <ImBlog /> <span className="ms-1">Community</span>
                </Navbar.Brand>
              </LinkContainer>
            </>
          ) : (
            <LinkContainer to="/">
              <Navbar.Brand>MERN AUTH</Navbar.Brand>
            </LinkContainer>
          )}
          <Navbar.Toggle aria-controls="basic-nabvar" />
          <Navbar.Collapse id="basic-navbar">
            <NavDropdown />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

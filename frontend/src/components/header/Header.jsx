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
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          {userInfo ? (
            <>
              <LinkContainer to="/blog">
                <Navbar.Brand>
                  <ImBlog /> Feed
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
            {/* <InputGroup.Text>
                Toggle Theme
                <InputGroup.Checkbox
                  visibility={6}
                  onChange={toggleTheme}
                ></InputGroup.Checkbox>
              </InputGroup.Text> */}

            <NavDropdown />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

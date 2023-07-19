import { Container, Nav, Navbar, Badge, InputGroup } from "react-bootstrap";
import NavDropdown from "./HeaderNav";
import { LinkContainer } from "react-router-bootstrap";
import { toggleTheme } from "../../utils/ThemeContext";

export function Header() {
  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-nabvar" />
          <Navbar.Collapse id="basic-navbar">
            <Nav className="ms-auto">
              <InputGroup.Text>
                Toggle Theme
                <InputGroup.Checkbox
                  visibility={6}
                  onChange={toggleTheme}
                ></InputGroup.Checkbox>
              </InputGroup.Text>
              <NavDropdown />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

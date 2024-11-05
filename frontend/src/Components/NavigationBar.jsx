import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Task manager</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>Bem-vindo(a)</Nav.Link>
            <Nav.Link as={Link} to="/task">
              My tasks
            </Nav.Link>
            <Nav.Link as={Link} to="/task/create">
              Add task
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default NavigationBar;

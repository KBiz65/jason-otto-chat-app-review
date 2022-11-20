import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import BrandLogo from "../../assets/chat-app-logo.png";

const RootNavbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="" className="nav-link">
            <img
              alt=""
              src={BrandLogo}
              width="30"
              height="30"
              className="d-inline-block align-top rounded"
            />{" "}
            D.N.D. Chat App
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="" className="nav-link">
              Home
            </NavLink>
            {/* if link is clicked when signing out, the run the signout function */}
            <NavLink
              to="signin"
              className="nav-link"
              onClick={() =>
                authContext.data.isSignedIn && authContext.signout()
              }
            >
              {authContext.data.isSignedIn ? "Sign Out" : "Sign In"}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RootNavbar;

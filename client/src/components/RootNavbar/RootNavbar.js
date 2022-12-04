import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { signout } from "../../modules/users";
import BrandLogo from "../../assets/chat-app-logo.png";

const RootNavbar = () => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);

  const signOutHandler = async () => {
    const respStatus = await signout();

    if (respStatus === 200) {
      authContext.signout();
      socketContext.disconnect();
      socketContext.reset();
    }
  };

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
            DND Chat App
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="" className="nav-link">
              Home
            </NavLink>
            <NavLink
              to="signin"
              className="nav-link"
              onClick={() => authContext.state.isSignedIn && signOutHandler()}
            >
              {authContext.state.isSignedIn ? "Sign Out" : "Sign In"}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RootNavbar;

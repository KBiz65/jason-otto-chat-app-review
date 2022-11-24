import { Fragment, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import ToastsContainer from "../../components/ToastsContainer/ToastsContainer";
import "./Home.css";

const Home = () => {
  const authContext = useContext(AuthContext);
  const [toasts, updateToasts] = useState([]);

  useEffect(() => {
    updateToasts(() => {
      const welcomeMessage = {
        title: "Welcome!",
        smallText: "",
        bodyText: `Signed in as ${authContext.data.username}, have fun!`,
      };
      return [welcomeMessage];
    });
  }, [authContext]);

  return (
    <Fragment>
      {!authContext.data.isSignedIn && <Navigate to="/signin" replace={true} />}
      <ToastsContainer toasts={toasts} />
      <Container>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Header className="text-center">
                <h3>Whose Online?</h3>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>User #1</ListGroup.Item>
                  <ListGroup.Item>User #2</ListGroup.Item>
                  <ListGroup.Item>User #3</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Header className="text-center">
                <h3>Chatroom</h3>
              </Card.Header>
              <Card.Body className="card-body__messages">
                <div className="imessage">
                  <p className="from-them">
                    It was loud. We just laid there and said &ldquo;is this an
                    earthquake? I think this is an earthquake.&rdquo;
                  </p>
                  <p className="from-me">
                    Like is this an earthquake just go back to sleep
                  </p>
                  <p className="from-them margin-b_one">
                    It&rsquo;s more like &ldquo;this is an earthquake. Check the
                    Internet. Yup. Earthquake. This is the size. This is the
                    epicenter. Check social media. Make sure the East Coast
                    knows I&rsquo;m alive. Okay, try and go back to
                    sleep.&rdquo;
                  </p>
                  <p className="from-me no-tail emoji">👍🏻</p>
                  <p className="from-me">Glad you&rsquo;re safe</p>
                </div>
                {/* <div className="message-container"></div> */}
              </Card.Body>
              <Card.Footer className="text-muted">
                <Form>
                  <InputGroup className="mt-3 mb-3">
                    <InputGroup.Text>
                      {authContext.data.username}
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      maxLength={180}
                      placeholder="Enter Message"
                      required
                    />
                    <Button variant="primary" type="submit">
                      Button
                    </Button>
                  </InputGroup>
                </Form>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;

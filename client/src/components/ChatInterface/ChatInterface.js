import { Container, Row, Col } from "react-bootstrap";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";
// import { io } from "socket.io-client";

const ChatInterface = () => {
  // const socket = io("http://localhost:3001/");

  console.log("loading chat interface");

  // useEffect(() => {
  //   // console.log("running useEffect");
  //   if (authContext.data.isSignedIn && authContext.data.username !== "Guest") {
  //     console.log("socket code running...");
  //     // const msg = ;
  //     socket.emit("chat message", "fuck you");
  //   }
  // }, []);

  // socket.emit("chat message", "i hate thanksgiving");

  return (
    <Container>
      <Row>
        <Col md={4}>
          <ChatSideBar />
        </Col>
        <Col md={8}>
          <ChatMessages />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface;

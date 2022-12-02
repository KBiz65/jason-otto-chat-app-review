import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import Chatroom from "./Chatroom/Chatroom";
import Sidebar from "./Sidebar/Sidebar";

const ChatInterface = () => {
  const socketContext = useContext(SocketContext);
  const authContext = useContext(AuthContext);

  const roomChangeHandler = (room) => {
    if (room !== socketContext.room) {
      socketContext.setRoom(room);
      socketContext.client.emit("joinRoom", {
        username: authContext.state.username,
        room: room,
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidebar
            currentRoom={socketContext.room}
            onRoomChange={roomChangeHandler}
          />
        </Col>
        <Col md={8}>
          <Chatroom currentRoom={socketContext.room} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface;

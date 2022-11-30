import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { Container, Row, Col } from "react-bootstrap";
import ChatMessages from "../../components/ChatMessages/ChatMessages";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";

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
          <ChatSideBar
            currentRoom={socketContext.room}
            onRoomChange={roomChangeHandler}
          />
        </Col>
        <Col md={8}>
          <ChatMessages currentRoom={socketContext.room} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface;

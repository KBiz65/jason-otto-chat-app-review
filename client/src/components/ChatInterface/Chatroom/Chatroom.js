import { useContext } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext";
import { SocketContext } from "../../../context/SocketContext";
import { getUTCDate } from "../../../utils/date";
import { postMessage } from "../../../modules/messages";
import MessagesDisplay from "./MessagesDisplay/MessagesDisplay";
import MessageForm from "./MessageForm/MessageForm";

const Chatroom = ({ currentRoom }) => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);

  const chatMessageSubmitHandler = async (message) => {
    const id = authContext.state.id;
    const room = socketContext.room;
    const timestamp = getUTCDate();
    const respStatus = await postMessage(id, room, message, timestamp);

    if (respStatus === 201) {
      socketContext.client.emit("new message", message);
    }
  };

  return (
    <Card>
      <Card.Header className="text-center">
        <h3>{`Chatroom #${currentRoom}`}</h3>
      </Card.Header>
      <Card.Body className="card-body__chat-messages">
        <MessagesDisplay />
      </Card.Body>
      <Card.Footer>
        <MessageForm onChatMessageSubmit={chatMessageSubmitHandler} />
      </Card.Footer>
    </Card>
  );
};

export default Chatroom;

import { useContext } from "react";
import { Card } from "react-bootstrap";
// import { host } from "../../../utils/host";
import { AuthContext } from "../../../context/AuthContext";
import { SocketContext } from "../../../context/SocketContext";
import MessagesDisplay from "./MessagesDisplay/MessagesDisplay";
import MessageForm from "./MessageForm/MessageForm";

import { postMessage } from "../../../modules/messages";

const Chatroom = ({ currentRoom }) => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);

  const chatMessageSubmitHandler = async (message) => {
    const id = authContext.state.id;
    const room = socketContext.room;
    const respStatus = await postMessage(id, room, message);

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

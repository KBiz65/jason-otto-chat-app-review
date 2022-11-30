import { useContext } from "react";
import { Card } from "react-bootstrap";
import { SocketContext } from "../../context/SocketContext";
import ChatDisplay from "../../components/ChatDisplay/ChatDisplay";
import ChatMessageForm from "../../components/ChatMessageForm/ChatMessageForm";

const ChatMessages = ({ currentRoom }) => {
  const socketContext = useContext(SocketContext);

  const chatMessageSubmitHandler = (message) => {
    socketContext.client.emit("new message", message);
  };

  return (
    <Card>
      <Card.Header className="text-center">
        <h3>{`Chatroom #${currentRoom}`}</h3>
      </Card.Header>
      <Card.Body className="card-body__chat-messages">
        <ChatDisplay />
      </Card.Body>
      <Card.Footer>
        <ChatMessageForm onChatMessageSubmit={chatMessageSubmitHandler} />
      </Card.Footer>
    </Card>
  );
};

export default ChatMessages;

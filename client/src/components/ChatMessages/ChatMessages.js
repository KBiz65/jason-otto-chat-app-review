import { useState } from "react";
import { Card } from "react-bootstrap";
import ChatDisplay from "../../components/ChatDisplay/ChatDisplay";
import ChatMessageForm from "../../components/ChatMessageForm/ChatMessageForm";

const ChatMessages = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const chatMessageSubmitHandler = (chatMessage) => {
    // todo: pass is to the message container
    setChatMessages((prevState) => {
      return [...prevState, chatMessage];
    });
    // todo: emit the message with the socket connection!
  };

  return (
    <Card>
      <Card.Header className="text-center">
        <h3>Chatroom</h3>
      </Card.Header>
      <Card.Body className="card-body__chat-messages">
        <ChatDisplay chatMessages={chatMessages} />
      </Card.Body>
      <Card.Footer>
        <ChatMessageForm onChatMessageSubmit={chatMessageSubmitHandler} />
      </Card.Footer>
    </Card>
  );
};

export default ChatMessages;

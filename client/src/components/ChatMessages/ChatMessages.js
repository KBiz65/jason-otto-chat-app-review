import { useContext } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import ChatDisplay from "../../components/ChatDisplay/ChatDisplay";
import ChatMessageForm from "../../components/ChatMessageForm/ChatMessageForm";

const ChatMessages = ({ currentRoom }) => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);

  const chatMessageSubmitHandler = async (message) => {
    const response = await fetch(`/api/messages`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_id: authContext.state.id,
        room: socketContext.room,
        text_content: message,
      }),
    })
      .then((resp) => resp)
      .catch((err) => console.log(err));

    if (response.status === 201) {
      socketContext.client.emit("new message", message);
    }
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

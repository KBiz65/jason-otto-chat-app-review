import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import "./ChatDisplay.css";

const ChatDisplay = () => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (socketContext.message) {
      if (chatMessages.length === 0) {
        setChatMessages(() => [socketContext.message]);
      } else {
        const lastMessage = chatMessages[chatMessages.length - 1];
        const notDuplicate = lastMessage.id !== socketContext.message.id;

        if (notDuplicate) {
          setChatMessages((prevState) => {
            return [...prevState, socketContext.message];
          });
        }
      }
    }

    if (socketContext.roomChanged) {
      socketContext.toggleRoomChanged();
      setChatMessages([]);
    }
  }, [socketContext]);

  return (
    <div className="imessage">
      {chatMessages.map((elem) => {
        const isFromUser = authContext.state.username === elem.username;
        return (
          <p key={elem.id} className={isFromUser ? "from-me" : "from-them"}>
            <span className="message-header">{`${
              isFromUser ? "You" : elem.username
            } ${elem.time}`}</span>
            {elem.message}
          </p>
        );
      })}
    </div>
  );
};

export default ChatDisplay;

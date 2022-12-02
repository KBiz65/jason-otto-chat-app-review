import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { getMessages } from "../../modules/messages";
import "./ChatDisplay.css";

const ChatDisplay = () => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (socketContext.roomChanged) {
      socketContext.toggleRoomChanged();
      getMessages(socketContext.room, setChatMessages);
    }
  }, [socketContext]);

  useEffect(() => {
    if (socketContext.message) {
      if (chatMessages.length > 0) {
        console.log(chatMessages);
        const lastMessage = chatMessages[chatMessages.length - 1];
        const notDuplicate = lastMessage.id !== socketContext.message.id;
        if (notDuplicate) {
          setChatMessages((prevMessages) => {
            return [...prevMessages, socketContext.message];
          });
        }
      } else {
        setChatMessages([socketContext.message]);
      }
    }
  }, [socketContext, chatMessages]);

  return (
    <div className="imessage">
      {chatMessages.map((elem) => {
        const isFromUser = authContext.state.username === elem.username;
        return (
          <p key={elem.id} className={isFromUser ? "from-me" : "from-them"}>
            <span className="message-header">{`${
              isFromUser ? "You" : elem.username
            } - ${elem.time}`}</span>
            {elem.message}
          </p>
        );
      })}
    </div>
  );
};

export default ChatDisplay;

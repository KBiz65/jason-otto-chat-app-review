import { useContext, useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { getMessages } from "../../modules/messages";
import MessageBubble from "../MessageBubble/MessageBubble";
import "./MessagesDisplay.css";

const MessagesDisplay = () => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const [chatMessages, setChatMessages] = useState([]);
  const messageDisplay = document.querySelector(".imessage");

  const scrollBottom = () => {
    setTimeout(() => {
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    }, 250);
  };

  useEffect(() => {
    if (socketContext.roomChanged) {
      socketContext.toggleRoomChanged();
      getMessages(socketContext.room, setChatMessages, messageDisplay);
      scrollBottom();
    }
  }, [socketContext]);

  useEffect(() => {
    if (socketContext.message) {
      if (chatMessages.length > 0) {
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
      scrollBottom();
    }
  }, [socketContext, chatMessages]);

  return (
    <div className="imessage">
      {chatMessages.map((elem) => {
        const isFromUser = authContext.state.username === elem.username;
        return (
          <MessageBubble
            key={uniqid()}
            isFromUser={isFromUser}
            message={elem}
          />
        );
      })}
      <div className="anchor"></div>
    </div>
  );
};

export default MessagesDisplay;

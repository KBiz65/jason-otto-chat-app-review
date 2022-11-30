import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import uniqid from "uniqid";
import "./ChatDisplay.css";

const ChatDisplay = () => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (socketContext.client) {
      if (socketContext.roomChanged) {
        console.log("room was changed, update display");
        socketContext.toggleRoomChanged();
        setChatMessages([]);
      } else if (socketContext.message) {
        console.log(socketContext.message);
        setChatMessages((prevState) => {
          return [...prevState, socketContext.message];
        });
      }
    }
  }, [socketContext]);

  return (
    <div className="imessage">
      {chatMessages.map((elem) => {
        return (
          <p
            key={uniqid()}
            className={
              authContext.username === elem.username ? "from-me" : "from-them"
            }
          >
            <span className="message-header">{`${elem.username} ${elem.time}`}</span>
            {elem.message}
          </p>
        );
      })}

      {/* <p className="from-them">messages from server</p> */}
      {/* <p className="from-me">my messages</p> */}
    </div>
  );
};

export default ChatDisplay;

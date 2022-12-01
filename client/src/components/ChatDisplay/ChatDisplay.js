import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import uniqid from "uniqid";
import * as dayjs from "dayjs";
import * as LocalizedFormat from "dayjs/plugin/localizedFormat";
import "./ChatDisplay.css";

dayjs.extend(LocalizedFormat);

const ChatDisplay = () => {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // get old messages
    if (socketContext.roomChanged) {
      const getMessages = async () => {
        const response = await fetch(
          `http://localhost:3001/api/messages?room=${socketContext.room}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        )
          .then((resp) => resp)
          .catch((err) => console.log(err));

        if (response.status === 200) {
          let { data } = await response.json();
          const oldMessages = data.map((elem) => {
            return {
              id: elem.id,
              username: elem.username,
              message: elem.text_content,
              time: dayjs(elem.created_on).format("ll LT"),
            };
          });

          // always overwrite anything in chatmessages
          if (socketContext.message) {
            setChatMessages([...oldMessages, socketContext.message]);
          }
          socketContext.toggleRoomChanged();
        }
      };
      getMessages(); // run the async function
    } else {
      // otherwise just listen for new messages
      if (socketContext.message && chatMessages.length > 0) {
        const lastMessage = chatMessages[chatMessages.length - 1];
        const notDuplicate = lastMessage.id !== socketContext.message.id;

        if (notDuplicate) {
          setChatMessages((prevState) => {
            return [...prevState, socketContext.message];
          });
        }
      }
    }
  }, [socketContext]);

  return (
    <div className="imessage">
      {chatMessages.map((elem) => {
        const isFromUser = authContext.state.username === elem.username;
        return (
          <p key={uniqid()} className={isFromUser ? "from-me" : "from-them"}>
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

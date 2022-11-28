import uniqid from "uniqid";
import "./ChatDisplay.css";

const ChatDisplay = (props) => {
  return (
    <div className="imessage">
      {props.chatMessages.map((message) => {
        return (
          <p key={uniqid()} className="from-me">
            {message}
          </p>
        );
      })}

      <p className="from-them">messages from server</p>
      {/* <p className="from-me">my messages</p> */}
    </div>
  );
};

export default ChatDisplay;

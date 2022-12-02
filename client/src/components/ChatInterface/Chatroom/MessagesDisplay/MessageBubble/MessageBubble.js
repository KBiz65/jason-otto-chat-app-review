const MessageBubble = ({ isFromUser, message }) => {
  return (
    <p className={isFromUser ? "from-me" : "from-them"}>
      <span className="message-header">{`${
        isFromUser ? "You" : message.username
      } - ${message.time}`}</span>
      {message.message}
    </p>
  );
};

export default MessageBubble;

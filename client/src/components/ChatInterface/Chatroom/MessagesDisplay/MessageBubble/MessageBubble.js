const MessageBubble = ({ isFromUser, message }) => {
  return (
    <p className={isFromUser ? "from-me" : "from-them"}>
      <span className="message-header">{`${
        isFromUser ? "You" : message.username
      } - ${message.timestamp}`}</span>
      {message.message}
    </p>
  );
};

export default MessageBubble;

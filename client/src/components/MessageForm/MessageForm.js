import { useContext, useRef, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const MessageForm = (props) => {
  const authContext = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const chatMessageInput = useRef();

  const chatMsgInputHandler = (e) => {
    if (e.target.value !== "") {
      setValidated(false);
    }
    setChatMessage(e.target.value);
  };

  const chatMsgFormSubmitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
    } else {
      props.onChatMessageSubmit(chatMessage);
      chatMessageInput.current.value = "";
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={chatMsgFormSubmitHandler}>
      <InputGroup className="mt-3 mb-3">
        <InputGroup.Text>{authContext.state.username}</InputGroup.Text>
        <Form.Control
          type="text"
          ref={chatMessageInput}
          onChange={chatMsgInputHandler}
          placeholder={
            authContext.state.isGuest
              ? "Create account or login to participate."
              : "Enter Message"
          }
          disabled={authContext.state.isGuest}
          maxLength={180}
          required
        />
        <Button
          variant="primary"
          type="submit"
          disabled={authContext.state.isGuest}
        >
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};
export default MessageForm;

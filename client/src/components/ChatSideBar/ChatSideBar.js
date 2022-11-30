import { Card, ListGroup, Dropdown, DropdownButton } from "react-bootstrap";

const ChatSideBar = ({ onRoomChange, currentRoom }) => {
  const chatroomSelectHandler = (room) => {
    onRoomChange(room);
  };

  return (
    <Card>
      <Card.Header className="text-center">
        <h3>Chat Rooms</h3>
        <DropdownButton
          title={`Chatroom #${currentRoom}`}
          onSelect={chatroomSelectHandler}
        >
          <Dropdown.Item eventKey={"1"}>Chatroom #1</Dropdown.Item>
          <Dropdown.Item eventKey={"2"}>Chatroom #2</Dropdown.Item>
          <Dropdown.Item eventKey={"3"}>Chatroom #3</Dropdown.Item>
        </DropdownButton>
      </Card.Header>
      <Card.Body>
        <h4 className="text-center">Whose Online?</h4>
        <ListGroup variant="flush">
          {/* <ListGroup.Item>User #1</ListGroup.Item>
          <ListGroup.Item>User #2</ListGroup.Item>
          <ListGroup.Item>User #3</ListGroup.Item> */}
        </ListGroup>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
  );
};

export default ChatSideBar;

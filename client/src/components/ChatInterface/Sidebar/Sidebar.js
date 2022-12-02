import { useContext } from "react";
import uniqid from "uniqid";
import { SocketContext } from "../../../context/SocketContext";
import { Card, ListGroup, Dropdown, DropdownButton } from "react-bootstrap";

const Sidebar = ({ onRoomChange, currentRoom }) => {
  const socketContext = useContext(SocketContext);

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
          {socketContext.users &&
            socketContext.users.map((elem) => {
              return (
                <ListGroup.Item key={uniqid()}>{elem.username}</ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
  );
};

export default Sidebar;

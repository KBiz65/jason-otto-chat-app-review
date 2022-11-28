import { Card, ListGroup } from "react-bootstrap";

const ChatSideBar = () => {
  return (
    <Card>
      <Card.Header className="text-center">
        <h3>Whose Online?</h3>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>User #1</ListGroup.Item>
          <ListGroup.Item>User #2</ListGroup.Item>
          <ListGroup.Item>User #3</ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
  );
};

export default ChatSideBar;

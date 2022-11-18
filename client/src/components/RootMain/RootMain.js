import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MainHeader from "../MainHeader/MainHeader";

const RootMain = () => {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <MainHeader />
            <Outlet />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default RootMain;

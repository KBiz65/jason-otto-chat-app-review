import { useState } from "react";
import { Toast } from "react-bootstrap";

const ToastNotification = (props) => {
  const [show, setShow] = useState(true);

  return (
    <Toast show={show} onClose={() => setShow(!show)} delay={5000} autohide>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{props.data.title}</strong>
        <small>{props.data.smallText}</small>
      </Toast.Header>
      <Toast.Body>{props.data.bodyText}</Toast.Body>
    </Toast>
  );
};

export default ToastNotification;

import { Fragment } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-bootstrap";
import ToastNotification from "../ToastNotification/ToastNotification";
import uniqid from "uniqid";

const ToastsContainer = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ToastContainer position="top-end" className="p-4">
          {props.toasts.map((elem) => {
            return <ToastNotification key={uniqid()} data={elem} />;
          })}
        </ToastContainer>,
        document.getElementById("toasts-root")
      )}
    </Fragment>
  );
};

export default ToastsContainer;

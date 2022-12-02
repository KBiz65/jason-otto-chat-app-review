import { useState, useRef, Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";
import { host } from "../../utils/host";
import { Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const SigninForm = (props) => {
  const authContext = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const signinFormSubmitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      if (!invalidInput) {
        setInvalidInput(true);
        setAlertVariant("danger");
        setAlertText("Invalid username and password combination.");
      }
    } else {
      const username = usernameInputRef.current.value;
      const password = passwordInputRef.current.value;

      const response = await fetch(`${host}/signin`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((resp) => resp)
        .catch((err) => console.log(err));

      if (response.status === 200) {
        const body = await response.json();
        const { id, username } = body;

        setValidated(true); // show feedback before proceeding
        setAlertVariant("success");
        setAlertText("Signed in successfully.");

        setTimeout(() => {
          authContext.signin(id, username);
        }, 2000);
      } else if (response.status === 401) {
        setValidated(false);
        setInvalidInput(true);
        setAlertVariant("danger");
        setAlertText("Invalid username and password combination.");
        passwordInputRef.current.value = "";
      }
    }
  };

  return (
    <Fragment>
      {authContext.state.isSignedIn && <Navigate to="/" replace={true} />}
      <Form noValidate validated={validated} onSubmit={signinFormSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={usernameInputRef}
            type="text"
            placeholder="Enter Username"
            isInvalid={invalidInput}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {invalidInput ? "" : "Please enter your username."}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordInputRef}
            type="password"
            placeholder="Enter Password"
            isInvalid={invalidInput}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {invalidInput ? "" : "Please enter your password."}
          </Form.Control.Feedback>
        </Form.Group>
        <Alert variant={alertVariant}>{alertText}</Alert>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => authContext.signin()}
        >
          Continue as Guest
        </Button>
        <Button
          variant="success"
          type="button"
          onClick={() => props.showSignupForm(true)}
        >
          Create Account
        </Button>
      </Form>
    </Fragment>
  );
};
export default SigninForm;

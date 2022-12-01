import { Fragment, useState, useContext, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const SignupForm = (props) => {
  const authContext = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertText, setAlertText] = useState("");
  const [usernameConflict, toggleUsernameConflict] = useState(false);
  const [emailConflict, toggleEmailConflict] = useState(false);
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const signUpFormSubmitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    // clear error feedback if present
    if (usernameConflict || emailConflict) {
      toggleUsernameConflict(false);
      toggleEmailConflict(false);
    }

    if (!form.checkValidity()) {
      setValidated(true);
    } else {
      const username = usernameInputRef.current.value;
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;

      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then((resp) => resp)
        .catch((err) => err);

      if (response.status === 201) {
        const { id } = await response.json();
        setValidated(true);
        setAlertText("Account created successfully.");
        setAlertVariant("success");
        setTimeout(() => {
          authContext.signin(id, username); // allow time to see feedback before redirect is triggered
        }, 2000);
      } else if (response.status === 409) {
        const body = await response.json();
        const conflict = body["conflict"];

        setValidated(false); // if you get an error remove any existing validation to avoid confusion
        setAlertVariant("danger");
        if (conflict === "username") {
          setAlertText(
            `Another user has already claimed the username ${username}.`
          );
          toggleUsernameConflict(true);
        } else if (conflict === "email") {
          setAlertText(
            "Email is already in use. Please provide another email."
          );
          toggleEmailConflict(true);
        }
      }
    }
  };

  return (
    <Fragment>
      {authContext.state.isSignedIn && <Navigate to="/" replace={true} />}
      <Form noValidate validated={validated} onSubmit={signUpFormSubmitHandler}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={usernameInputRef}
            type="text"
            pattern="^\w{6,32}$"
            placeholder="Enter Username"
            isInvalid={usernameConflict}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {usernameConflict
              ? "Username is already taken."
              : "Username is invalid."}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Must be between 6-32 characters long and only contain letters,
            numbers, and underscores.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            ref={emailInputRef}
            type="email"
            placeholder="Enter Email"
            isInvalid={emailConflict}
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {emailConflict ? "Email is already in use." : "Email is invalid."}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Your email will not be shared with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordInputRef}
            type="password"
            pattern="^\d{4}$"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Password is invalid.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Must be a 4-digit password.
          </Form.Text>
        </Form.Group>
        <Alert variant={alertVariant}>{alertText}</Alert>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => props.showSigninForm(true)}
        >
          Back
        </Button>
      </Form>
    </Fragment>
  );
};

export default SignupForm;

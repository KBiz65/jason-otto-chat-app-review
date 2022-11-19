import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

const SigninForm = (props) => {
  const [validated, setValidated] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const signinFormSubmitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
    } else {
      console.log("form ok");

      const username = usernameInputRef.current.value;
      const password = passwordInputRef.current.value;

      // use your client to make the call to the server to validate
      const resp = await fetch("http://localhost:3001/signin", {
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
        .then((resp) => resp.json())
        .catch((err) => {
          console.log(err);
        });

      console.log(resp);
    }
  };

  // it will send the information provided to the server
  // await verification and the redirect the user to HOME if valid info provided
  // or will inform user the username password combo failed

  return (
    <Form noValidate validated={validated} onSubmit={signinFormSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          ref={usernameInputRef}
          type="text"
          placeholder="Enter username"
          required
        />
        <Form.Text className="text-muted">Enter that username</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          ref={passwordInputRef}
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button
        variant="primary"
        type="button"
        onClick={() => props.showSignupForm(true)}
      >
        Create Account
      </Button>
    </Form>
  );
};
export default SigninForm;

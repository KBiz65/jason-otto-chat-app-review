import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

const SigninForm = (props) => {
  const [validated, setValidated] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const signinFormSubmitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setValidated(true);
    } else {
      // const email = emailInputRef.current.value;
      // const password = passwordInputRef.current.value;

      console.log("form ok");

      // use your client to make the call to the server to validate
      const response = await fetch("http://localhost:3001/", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // it will send the information provided to the server
  // await verification and the redirect the user to HOME if valid info provided
  // or will inform user the username password combo failed

  return (
    <Form noValidate validated={validated} onSubmit={signinFormSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          ref={emailInputRef}
          type="email"
          placeholder="Enter email"
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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

import { useState, useRef, Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const SigninForm = (props) => {
  const authContext = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  // useEffect(() => {
  //   console.log(authContext);
  // }, [authContext]);

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

      const response = await fetch("http://localhost:3001/signin", {
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
        .then((resp) => {
          // console.log(resp);
          return resp;
        })
        .catch((err) => {
          console.log(err);
        });

      if (response.status === 200) {
        console.log("you've logged in successfully");

        const body = await response.json();
        const username = body["username"];

        authContext.signin(username);
        // console.log(authContext.data);
      }
    }
  };

  const continueAsGuestHandler = () => {
    authContext.signin();
  };

  return (
    <Fragment>
      {authContext.data.isSignedIn && <Navigate to="/" replace={true} />}
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
          variant="secondary"
          type="button"
          onClick={continueAsGuestHandler}
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

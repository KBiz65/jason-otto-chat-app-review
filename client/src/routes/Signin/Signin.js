import { Fragment, useState } from "react";
import { Card } from "react-bootstrap";
import SigninForm from "../../components/SigninForm/SigninForm";
import SignupForm from "../../components/SignupForm/SignupForm";

const Signin = () => {
  const [showSigninForm, toggleSigninForm] = useState(true);

  return (
    <Fragment>
      <Card>
        <Card.Header as="h3">
          {showSigninForm ? "Sign In" : "Create Account"}
        </Card.Header>
        <Card.Body>
          {showSigninForm ? (
            <SigninForm showSignupForm={(bool) => toggleSigninForm(!bool)} />
          ) : (
            <SignupForm showSigninForm={toggleSigninForm} />
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Signin;

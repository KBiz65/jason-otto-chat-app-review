import { Form, Button } from "react-bootstrap";

const SignupForm = (props) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
        <Form.Text className="text-muted">
          Must be at least blah blah blah.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
      <Button
        variant="primary"
        type="button"
        onClick={() => props.showSigninForm(true)}
      >
        Back
      </Button>
    </Form>
  );
};

export default SignupForm;

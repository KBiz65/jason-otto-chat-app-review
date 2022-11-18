import { Fragment } from "react";
import SigninForm from "../../components/SigninForm/SigninForm";

const Signin = () => {
  return (
    <Fragment>
      <h2>This is the signin page</h2>
      <p>Here you will see...</p>
      <ul>
        <li>login form, and that's it</li>
        <li>
          it will have the form, obviously, but also the option to view as guest
        </li>
      </ul>
      <SigninForm />
    </Fragment>
  );
};

export default Signin;

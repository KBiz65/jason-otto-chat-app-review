import { Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <Fragment>
      {!authContext.data.isSignedIn && <Navigate to="/signin" replace={true} />}
      <h2>This is the home page</h2>
      <p>Here you will see...</p>
      <ul>
        <li>Sidebar Containing the current online users</li>
        <li>Chat UI, containing all messages and input</li>
      </ul>
    </Fragment>
  );
};

export default Home;

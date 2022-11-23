import { Fragment, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ToastsContainer from "../../components/ToastsContainer/ToastsContainer";

const Home = () => {
  const authContext = useContext(AuthContext);
  const [toasts, updateToasts] = useState([]);

  useEffect(() => {
    updateToasts(() => {
      const welcomeMessage = {
        title: "Welcome!",
        smallText: "",
        bodyText: `Signed in as ${authContext.data.username}, have fun!`,
      };
      return [welcomeMessage];
    });
  }, [authContext]);

  return (
    <Fragment>
      {!authContext.data.isSignedIn && <Navigate to="/signin" replace={true} />}
      <ToastsContainer toasts={toasts} />
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

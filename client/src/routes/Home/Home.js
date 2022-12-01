import { Fragment, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ChatInterface from "../../components/ChatInterface/ChatInterface";
import "./Home.css";

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <Fragment>
      {!authContext.state.isSignedIn && (
        <Navigate to="/signin" replace={true} />
      )}
      <ChatInterface />
    </Fragment>
  );
};

export default Home;

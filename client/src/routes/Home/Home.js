import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import ChatInterface from "../../components/ChatInterface/ChatInterface";
import "./Home.css";

const Home = () => {
  // console.log("loading home component");
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

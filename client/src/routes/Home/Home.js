import { Fragment, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Navigate } from "react-router-dom";
import ChatInterface from "../../components/ChatInterface/ChatInterface";
import "./Home.css";

const Home = () => {
  console.log("loading the home component");
  const authContext = useContext(AuthContext);
  // const [socketContext, setSocketContext] = useState(socket);

  // useEffect(() => {
  //   if (authContext.state.isSignedIn && !socket.client) {
  //     console.log("connect to server with socket");
  //     socket.connect();

  //     socket.client.on("user status", (message) => {
  //       setSocketContext((prevState) => {
  //         return {
  //           ...prevState,
  //           message,
  //         };
  //       });
  //     });

  //     socket.client.on("new message", (message) => {
  //       setSocketContext((prevState) => {
  //         return {
  //           ...prevState,
  //           message,
  //         };
  //       });
  //     });
  //   }
  // }, []);

  return (
    <Fragment>
      {!authContext.state.isSignedIn && (
        <Navigate to="/signin" replace={true} />
      )}
      {/* <SocketContext.Provider value={socketContext}> */}
      <ChatInterface />
      {/* </SocketContext.Provider> */}
    </Fragment>
  );
};

export default Home;

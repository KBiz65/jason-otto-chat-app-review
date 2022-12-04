import { React, Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { state, AuthContext } from "../../context/AuthContext";
import { socket, SocketContext } from "../../context/SocketContext";
import RootNavbar from "../../components/RootNavbar/RootNavbar";
import RootMain from "../../components/RootMain/RootMain";
import RootFooter from "../../components/RootFooter/RootFooter";
import "./Root.css";

const Root = () => {
  const signin = (id = null, username = "Guest") => {
    setAuthContext((prevState) => {
      return {
        ...prevState,
        state: {
          id,
          username,
          isSignedIn: true,
          isGuest: username === "Guest",
          justSignedOut: false,
        },
      };
    });
  };
  const signout = () => {
    setAuthContext((prevState) => {
      return {
        ...prevState,
        state: {
          id: null,
          username: "",
          isSignedIn: false,
          isGuest: false,
          justSignedOut: true,
        },
      };
    });
  };
  const [authContext, setAuthContext] = useState({ state, signin, signout });
  const [socketContext, setSocketContext] = useState(socket);
  const defaultRoom = "1";

  useEffect(() => {
    if (authContext.state.isSignedIn) {
      toast(`Welcome! Signed in as ${authContext.state.username}`);
    } else if (authContext.state.justSignedOut) {
      toast("Good-bye! Signed out successfully.");
    }

    if (authContext.state.isSignedIn && !socketContext.client) {
      socketContext.setStateFunct(setSocketContext);
      socketContext.connect();
      socketContext.initEventHandlers();

      socketContext.client.emit("joinRoom", {
        username: authContext.state.username,
        room: defaultRoom,
      });
      // update context with current room
      setSocketContext((prevState) => {
        return {
          ...prevState,
          room: defaultRoom,
          roomChanged: true,
        };
      });
    }

    const timerId = setTimeout(() => {
      if (authContext.state.justSignedOut) {
        setAuthContext((prevState) => {
          return {
            ...prevState,
            state: {
              id: null,
              username: "",
              isSignedIn: false,
              isGuest: false,
              justSignedOut: false,
            },
          };
        });
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [authContext]);

  return (
    <Fragment>
      <ToastContainer />
      <AuthContext.Provider value={authContext}>
        <SocketContext.Provider value={socketContext}>
          <RootNavbar />
          <RootMain />
        </SocketContext.Provider>
      </AuthContext.Provider>
      <RootFooter />
    </Fragment>
  );
};

export default Root;

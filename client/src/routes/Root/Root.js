import { React, Fragment, useState, useEffect } from "react";
import { state, AuthContext } from "../../context/AuthContext";
import { socket, SocketContext } from "../../context/SocketContext";
import { ToastContainer, toast } from "react-toastify";
import RootNavbar from "../../components/RootNavbar/RootNavbar";
import RootMain from "../../components/RootMain/RootMain";
import RootFooter from "../../components/RootFooter/RootFooter";
import "react-toastify/dist/ReactToastify.css";
import "./Root.css";

const Root = () => {
  const signin = (username = "Guest") => {
    setAuthContext((prevState) => {
      return {
        ...prevState,
        state: {
          username: username,
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
          username: "",
          isSignedIn: false,
          isGuest: false,
          justSignedOut: true,
        },
      };
    });
  };
  socket.setRoom = (room) => {
    setSocketContext((prevState) => {
      return {
        ...prevState,
        room,
        roomChanged: true,
      };
    });
  };
  socket.toggleRoomChanged = () => {
    setSocketContext((prevState) => {
      return {
        ...prevState,
        roomChanged: false,
        message: null,
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
      console.log("connect to server with socket");
      socketContext.connect();

      socketContext.client.emit("joinRoom", {
        username: authContext.state.username,
        room: defaultRoom,
      });
      // update context with current room
      setSocketContext((prevState) => {
        console.log("updating the room");
        return {
          ...prevState,
          room: defaultRoom,
        };
      });

      socketContext.client.on("user status", (message) => {
        setSocketContext((prevState) => {
          return {
            ...prevState,
            message,
          };
        });
      });

      socketContext.client.on("new message", (message) => {
        setSocketContext((prevState) => {
          return {
            ...prevState,
            message,
          };
        });
      });
    }

    const timerId = setTimeout(() => {
      if (authContext.state.justSignedOut) {
        setAuthContext((prevState) => {
          return {
            ...prevState,
            state: {
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

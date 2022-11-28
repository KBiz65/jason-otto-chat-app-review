import { React, Fragment, useState, useEffect } from "react";
import { state, AuthContext } from "../../context/AuthContext";
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
  const [authContext, setAuthContext] = useState({ state, signin, signout });

  useEffect(() => {
    if (authContext.state.isSignedIn) {
      toast(`Welcome! Signed in as ${authContext.state.username}`);
    } else if (authContext.state.justSignedOut) {
      toast("Good-bye! Signed out successfully.");
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
        <RootNavbar />
        <RootMain />
      </AuthContext.Provider>
      <RootFooter />
    </Fragment>
  );
};

export default Root;

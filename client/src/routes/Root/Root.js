import { React, Fragment, useState, useEffect } from "react";
import { state, AuthContext } from "../../context/AuthContext";
import RootNavbar from "../../components/RootNavbar/RootNavbar";
import RootMain from "../../components/RootMain/RootMain";
import RootFooter from "../../components/RootFooter/RootFooter";
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
        },
      };
    });
  };
  const [authContext, setAuthContext] = useState({ state, signin, signout });

  console.log("loading root");

  useEffect(() => {
    console.log(authContext);
  }, [authContext]);

  return (
    <Fragment>
      <AuthContext.Provider value={authContext}>
        <RootNavbar />
        <RootMain />
      </AuthContext.Provider>
      <RootFooter />
    </Fragment>
  );
};

export default Root;

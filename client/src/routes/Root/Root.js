import { React, Fragment, useState, useEffect } from "react";
import { data, AuthContext } from "../../context/AuthContext";
import RootNavbar from "../../components/RootNavbar/RootNavbar";
import RootMain from "../../components/RootMain/RootMain";
import RootFooter from "../../components/RootFooter/RootFooter";
import "./Root.css";

const Root = () => {
  const signin = (username = "Guest") => {
    setData((prevState) => {
      return {
        ...prevState,
        data: {
          username: username,
          isSignedIn: true,
          isGuest: username === "Guest",
        },
      };
    });
  };
  const signout = () => {
    setData((prevState) => {
      return {
        ...prevState,
        data: {
          username: "",
          isSignedIn: false,
          isGuest: false,
        },
      };
    });
  };
  const [authData, setData] = useState({ data, signin, signout });

  useEffect(() => {
    console.log(authData);
  }, [authData]);

  return (
    <Fragment>
      <AuthContext.Provider value={authData}>
        <RootNavbar />
        <RootMain />
      </AuthContext.Provider>
      <RootFooter />
    </Fragment>
  );
};

export default Root;

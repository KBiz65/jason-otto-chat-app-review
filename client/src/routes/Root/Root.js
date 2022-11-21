import { React, Fragment, useState, useEffect } from "react";
import { data, AuthContext } from "../../context/AuthContext";
import RootNavbar from "../../components/RootNavbar/RootNavbar";
import RootMain from "../../components/RootMain/RootMain";
import RootFooter from "../../components/RootFooter/RootFooter";
import "./Root.css";

// ! HOW TO IMPLEMENT GUEST?
// ? we need to disable the ability to add messages but still be view the home page
// ? based on whether the user has logged in or has opted to proceed as a guest
// ? ** MAIN IDEA ** this is about disabling a form on the home page with a boolean value

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

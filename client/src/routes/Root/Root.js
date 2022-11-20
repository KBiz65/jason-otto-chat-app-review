import { React, Fragment, useState } from "react";
import { data, AuthContext } from "../../context/AuthContext";
import RootNavbar from "../../components/RootNavbar/RootNavbar";
import RootMain from "../../components/RootMain/RootMain";
import RootFooter from "../../components/RootFooter/RootFooter";
import "./Root.css";

const Root = () => {
  const signin = () => {
    setData((prevState) => {
      return {
        ...prevState,
        data: {
          username: prevState.data.username,
          isSignedIn: true,
        },
      };
    });
  };
  const signout = () => {
    setData((prevState) => {
      return {
        ...prevState,
        data: {
          username: prevState.data.username,
          isSignedIn: false,
        },
      };
    });
  };
  const [authData, setData] = useState({ data, signin, signout });

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

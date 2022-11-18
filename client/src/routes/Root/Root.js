import { React, Fragment } from "react";
import AuthContext from "../../context/AuthContext";
import RootNavbar from "../../components/RootNavbar/RootNavbar";
import RootMain from "../../components/RootMain/RootMain";
import RootFooter from "../../components/RootFooter/RootFooter";
import "./Root.css";

const Root = () => {
  return (
    <Fragment>
      <AuthContext.Provider value={true}>
        <RootNavbar />
        <RootMain />
      </AuthContext.Provider>
      <RootFooter />
    </Fragment>
  );
};

export default Root;

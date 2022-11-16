import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div id="detail">
      <Outlet />
    </div>
  );
};

export default Root;

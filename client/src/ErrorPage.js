import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>
        <i>
          {error.status} | {error.statusText || error.message}
        </i>
      </p>
    </div>
  );
};

export default ErrorPage;

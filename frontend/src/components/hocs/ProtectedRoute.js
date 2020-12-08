import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
  const { children, path, ...rest } = props;
  return (
    <Route path={path}>
      {() =>
        props.loggedIn ? (
          <>{React.cloneElement(children, { ...rest })}</>
        ) : (
          <Redirect to="./sign-in" />
        )
      }
    </Route>
  );
}

export default ProtectedRoute;

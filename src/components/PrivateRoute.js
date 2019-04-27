import React from "react";
import { Redirect, Route } from "react-router-dom";

import trelloAuth from "../utils/trelloAuth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      trelloAuth.getToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

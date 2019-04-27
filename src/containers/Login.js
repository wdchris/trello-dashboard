import React from "react";
import { Redirect } from "react-router-dom";

import trelloAuth from "../utils/trelloAuth";

const Login = props =>
  trelloAuth.getToken() !== null ? (
    <Redirect
      to={{
        pathname: "/",
        state: { from: props.location }
      }}
    />
  ) : (
    <div>
      <p>You must log in to view this page</p>
    </div>
  );

export default Login;

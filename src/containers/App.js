import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import NotFoundPage from "./NotFoundPage";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ErrorBoundary from "../components/ErrorBoundary";

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Router>
          <div className="app">
            <Switch>
              <PrivateRoute path="/" component={Dashboard} exact />
              <Route path="/login" component={Login} />
              <Route path="" component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </ErrorBoundary>
    );
  }
}

export default App;

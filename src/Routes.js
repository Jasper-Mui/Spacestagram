import React, { Suspense } from "react";
import {  BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

const Home = React.lazy(() => import("./containers/Home/Home"));

const RouterApp = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default RouterApp;

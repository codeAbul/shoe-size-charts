import React, { Fragment } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import DrawCharts from "../DrawCharts";
import styles from "./App.module.scss";
import Navigation from "../Navigation";

function App() {
  return (
    <Fragment>
      <Navigation />
      <Switch>
        <Route path={"/"} exact children={<DrawCharts role={"admin"} />} />
        <Route path={"/admin"} children={<DrawCharts role={"admin"} />} />
        <Route path={"/manager"} children={<DrawCharts role={"manager"} />} />
        <Route path={"/store"} children={<DrawCharts role={"store"} />} />
      </Switch>
    </Fragment>
  );
}

export default App;

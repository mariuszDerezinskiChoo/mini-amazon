
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Login/RegisterPortal";
import App from './App'
import testAPI from '/Login/testAPI';
import RegisterPortal from '/Login/RegisterPortal';
import Home from '/components/Home';

export default class Routes extends Component {
    render() {
        return (
    <Router>
   <Switch>
        <Route path='/home' component={ Home }></Route>
        <Route path='/register' exact component={ RegisterPortal }></Route>
        <Route path='/test-api' exact component={ testAPI }></Route>
   </Switch>
</Router>
)
    }
}
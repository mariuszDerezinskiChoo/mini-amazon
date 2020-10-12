
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import HomePage from "./HomePage"
import App from './App'

export default class Routes extends Component {
    render() {
        return (
    <Router>
   <Switch>
        <Route path='/' exact component={ Home }></Route>
        <Route path='/login' exact component={ LoginPage }></Route>
        <Route path='/signup' exact component={ LoginPage }></Route>
        <Route path='/test-api' exact component={ App }></Route>
   </Switch>
</Router>
)
    }
}
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./Login/LoginPage";
import { Router, Route } from "react-router";
import App from "./App"
import HomePage from "./HomePage";

//function App() {
  //return <h1>Hello React Router</h1>;
//}

ReactDOM.render(
  <BrowserRouter>
    <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/test-api" component={App} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
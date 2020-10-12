import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import HomePage from "./HomePage";
import LoginPage from "./Login/LoginPage";
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import * as serviceWorker from './serviceWorker';
import Navbar from './NavBar';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
      <Switch>
      <Route exact path="/cart">
        <Cart/>
      </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/test-api" component={App} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import HomePage from "./HomePage";
import LoginPage from "./Login/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css"
import * as serviceWorker from './serviceWorker';
import Review from "./components/Review";
import Navbar from './NavBar';
import Seller from './components/Seller';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import TestAPI from './Login/testAPI';

ReactDOM.render(
<React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/cart" component={Cart} />
        <Route path="/login" component={LoginPage} />
        <Route path="/test-api" component={TestAPI} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/seller" component={Seller} />
        <Route exact path="/review" component={Review} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

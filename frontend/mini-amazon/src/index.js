import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Balance from "./components/Balance";
import TradeHistory from "./components/TradeHistory";
import PurchaseHistory from "./components/PurchaseHistory";
import LoginPortal from "./Login/LoginPortal";
import "bootstrap/dist/css/bootstrap.min.css"
import * as serviceWorker from './serviceWorker';
import Review from "./components/Review";
import NavBar from './NavBar';
import Seller from './components/Seller';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Results from "./Results";
import TestAPI from './Login/testAPI';
import ItemPage from "./ItemPage";
//import Item from "./components/Item";
import RegisterForm from './Login/RegisterForm';
import Nav from "./components/Nav";
import Profile from "./Login/Profile";
import ForgetPassword from './Login/ForgetPassword';

ReactDOM.render(
<React.StrictMode>
    <BrowserRouter>
      <Switch>
      <Route exact path="/nav" component={Nav} />
        <Route exact path="/cart" component={Cart} />
        <Route path="/login" component={LoginPortal} />
        <Route path="/test-api" component={TestAPI} />
        <Route exact path="/" component={LoginPortal} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={LoginPortal} />
        <Route exact path="/test-api" component={TestAPI} />
        <Route exact path="/seller" component={Seller} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/balance" component={Balance} />
        <Route exact path="/trade-history" component={TradeHistory} />
        <Route exact path="/purchase-history" component={PurchaseHistory} />
        <Route exact path="/results/:search" component={Results}/>
        <Route exact path="/item/:item/:seller/:id" component={ItemPage}/>
        <Route exact path="/forgetPassword" component={ForgetPassword}/>
        <Route exact path="/review" component={Review} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

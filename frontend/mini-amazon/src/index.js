import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
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
import HomePage from "./HomePage";
//import Item from "./components/Item";
import RegisterForm from './Login/RegisterForm';
import Nav from "./components/Nav";
import Profile from "./Login/Profile";
import ForgetPassword from './Login/ForgetPassword';
import ProtectedRoute from './ProtectedRoute';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

ReactDOM.render(
<React.StrictMode>
    <BrowserRouter>
      <Switch>
      <ProtectedRoute exact path="/nav" component={Nav} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route path="/login" component={LoginPortal} />
        <ProtectedRoute path="/test-api" component={TestAPI} />
        <Route exact path="/" component={LoginPortal} />
        <ProtectedRoute exact path="/home" component={HomePage} />
        <ProtectedRoute exact path="/test-api" component={TestAPI} />
        <ProtectedRoute exact path="/seller" component={Seller} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/register" component={RegisterForm} />
        <ProtectedRoute exact path="/balance" component={Balance} />
        <ProtectedRoute exact path="/trade-history" component={TradeHistory} />
        <ProtectedRoute exact path="/purchase-history" component={PurchaseHistory} />
        <Route exact path="/results/:search" component={Results}/>
        <Route exact path="/item/:seller/:id" component={ItemPage}/>
        <Route exact path="/forgetPassword" component={ForgetPassword}/>
        <ProtectedRoute exact path="/review" component={Review} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

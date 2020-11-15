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
import Navbar from './NavBar';
import Seller from './components/Seller';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Results from "./Results";
import TestAPI from './Login/testAPI';
import BuyerForm from './Login/BuyerForm';

ReactDOM.render(
<React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/cart" component={Cart} />
        <Route path="/login" component={LoginPortal} />
        <Route path="/test-api" component={TestAPI} />
        <Route exact path="/" component={Home} />
        <Route exact path="/seller" component={Seller} />
        <Route exact path="/addReview" component={Review} />
        <Route exact path="/register" component={BuyerForm} />
        <Route exact path="/balance" component={Balance} />
        <Route exact path="/trade-history" component={TradeHistory} />
        <Route exact path="/purchase-history" component={PurchaseHistory} />
        <Route exact path="/results/:search" component={Results}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

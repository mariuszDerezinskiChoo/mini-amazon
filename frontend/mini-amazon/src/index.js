import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./components/Home";
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
import ItemPage from "./ItemPage";
//import Item from "./components/Item";

ReactDOM.render(
<React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/cart" component={Cart} />
        <Route path="/login" component={LoginPortal} />
        <Route path="/test-api" component={TestAPI} />
        <Route exact path="/" component={LoginPortal} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/seller" component={Seller} />
        <Route exact path="/addReview" component={Review} />
        <Route exact path="/register" component={BuyerForm} />
        <Route exact path="/results/:search" component={Results}/>
        <Route exact path="/item/:item/:seller/:id" component={ItemPage}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

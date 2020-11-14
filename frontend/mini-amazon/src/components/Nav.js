import React from "react";
import {Redirect} from 'react-router-dom';
import { useState, Component } from "react";
import NavBar from '../NavBar';

class Nav extends Component {
constructor(props) {
    super(props);

    this.state = {
        email: JSON.parse(sessionStorage.getItem('email')),
        first_name: JSON.parse(sessionStorage.getItem('first_name')),
        last_name: JSON.parse(sessionStorage.getItem('last_name')),
        balance: JSON.parse(sessionStorage.getItem('balance'))
      }

}
      

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    
return (
    <div >
      <NavBar/>
      <h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>Welcome back  {this.state.first_name}! </h2>
    </div>
  );
}
}

export default Nav;



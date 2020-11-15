import React from "react";
import {Redirect} from 'react-router-dom';
import { useState, Component } from "react";
import NavBar from '../NavBar';

class Profile extends Component {
constructor(props) {
    super(props);


    this.state = {
        email: JSON.parse(sessionStorage.getItem('email')),
        first_name: JSON.parse(sessionStorage.getItem('first_name')),
        last_name: JSON.parse(sessionStorage.getItem('last_name')),
        balance: JSON.parse(sessionStorage.getItem('balance')),
        name: JSON.parse(sessionStorage.getItem('name')),
        description: JSON.parse(sessionStorage.getItem('description')),
        isStorefront: JSON.parse(sessionStorage.getItem('isStoreFront'))
    }
}
      

  render() {
      console.log(this.state.last_name);

    let content = null;
    if (this.state.last_name != null) {
      content = <div><h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>First Name: {this.state.first_name} </h2>
      <h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>Last Name: {this.state.last_name} </h2>
      <h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>Email:  {this.state.email} </h2>
    <h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>Balance:  {this.state.balance} </h2></div>;
    } else {
      content = <div><h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>Name: {this.state.name} </h2>
      <h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>Description: {this.state.description} </h2>
      <h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>Email:  {this.state.email} </h2>
      <h2 className="form-group text-center" style={{ fontsize: 40, color: 'blue'}}>Balance:  {this.state.balance} </h2></div>;
    }
    
return (
    <div >
      <NavBar/>
      {content}
      </div>
  );
}
}

export default Profile;



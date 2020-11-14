import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./LoginPortal.css";
import {Redirect} from 'react-router-dom';
import {PostData} from "./PostData";
import axios from "axios";
import "./LoginPortal.css";

class LoginPortal extends Component {

  constructor(props){
    super(props);
   
    this.state = {
     email: '',
     password: '',
     balance: '',
     first_name: '',
     last_name: '',
     redirectToReferrer: false,
     error: null
    }

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);

  }

 
  login() {
    //console.log("Login function");
    if(this.state.email && this.state.password){ // if smth is there for email and password
      axios.post('http://127.0.0.1:5000/buyers', this.state)
      .then((res) => {
          console.log(res.data.buyer);
          console.log(res.status);
    if(res.data.buyer.length == 0 ){        // returns smth  
         //sessionStorage.setItem('userData',JSON.stringify(res));
         this.setState({redirectToReferrer: false});
         this.setState({noData: true}) ;
       }
    else {
      sessionStorage.setItem('email',JSON.stringify(res.data.buyer[0].email));
      sessionStorage.setItem('first_name',JSON.stringify(res.data.buyer[0].first_name));
      sessionStorage.setItem('last_name',JSON.stringify(res.data.buyer[0].last_name));
      sessionStorage.setItem('balance',JSON.stringify(res.data.buyer[0].balance));
      this.state = {
        email: JSON.parse(sessionStorage.getItem('email')),
        first_name: JSON.parse(sessionStorage.getItem('first_name')),
        last_name: JSON.parse(sessionStorage.getItem('last_name')),
        balance: JSON.parse(sessionStorage.getItem('balance'))
      }
      this.setState({redirectToReferrer: true});
    }    
      }).catch(error => this.setState({error}))
    }
    
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

   

  render() {
    
    const isEnabled = this.state.email.length > 0 && this.state.password.length > 0;
     
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/nav'}/>)
    }
   
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/nav'}/>)
    }

    let message;
    if (this.state.noData) {
      message = 'Email and Password combination is incorrect!';
    }
    

     return (
      <div className="container">

      <h1 style={{ color: '#007bff'}}>LOGIN</h1>
      
      <div className="form-group text-center">
      <label style={{ padding: 5}}>Email: </label>
      <input type="text" name="email" placeholder="Email" className="input" onChange={this.onChange} />
      </div>
      
      <div className="form-group text-center">
      <label style={{ padding: 5}}>Password: </label>
      <input type="password" name="password"  placeholder="Password" className="input" onChange={this.onChange}/>
      </div>
      
      <div className="form-group text-center">
      <input type="submit" className="button success" value="Login" onClick={this.login} className="input" disabled={!isEnabled}/>
      </div>
      <div className="form-group text-center" style={{ color: 'red'}}>{message}</div>

      <p>Don't have an account?<a size="sm" variant="light" href="/register"> Click here to register</a> </p>

    <a size="sm" variant="light" href="/forgotpassword">Forgot password?</a> 
   
      </div>
     
  

  
  
    );
  }
} export default LoginPortal;



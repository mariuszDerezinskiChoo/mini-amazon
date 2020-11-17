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
     description: '',
      name: '',
     redirectToReferrer: false,
     error: null,
     isStorefront: false
    }

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  login() {
    //console.log("Login function");
    if(this.state.email && this.state.password){ // if smth is there for email and password
      if (this.state.isStorefront == false) {
        console.log(this.state.email)
        console.log(this.state.password)
        axios.post('http://localhost:5000/buyers', this.state)
        .then((res) => {
            console.log(res.data)
            console.log(res.status);
      if(res.data.buyer_detail.length < 1 ){        // returns smth  
           //sessionStorage.setItem('userData',JSON.stringify(res));
           this.setState({redirectToReferrer: false});
           this.setState({noData: true}) ;
         }
      else {
        sessionStorage.setItem('email',JSON.stringify(res.data.buyer_detail[0].email));
        sessionStorage.setItem('first_name',JSON.stringify(res.data.buyer_detail[0].first_name));
        sessionStorage.setItem('last_name',JSON.stringify(res.data.buyer_detail[0].last_name));
        sessionStorage.setItem('balance',JSON.stringify(res.data.buyer_detail[0].balance));
        this.state = {
          email: JSON.parse(sessionStorage.getItem('email')),
          first_name: JSON.parse(sessionStorage.getItem('first_name')),
          last_name: JSON.parse(sessionStorage.getItem('last_name')),
          balance: JSON.parse(sessionStorage.getItem('balance'))
        }
        console.log()
        this.setState({redirectToReferrer: true});
      }    
        }).catch(error => this.setState({error}))
      }
    else {

      axios.post('http://localhost:5000/storefronts', this.state)
      .then((res) => {
          console.log(res.data)
          console.log(res.status);
    if(res.data.storefronts.length < 1 ){        // returns smth  
         //sessionStorage.setItem('userData',JSON.stringify(res));
         this.setState({redirectToReferrer: false});
         this.setState({noData: true}) ;
       }
    else {
      sessionStorage.setItem('email',JSON.stringify(res.data.storefronts[0].email));
      sessionStorage.setItem('name',JSON.stringify(res.data.storefronts[0].name));
      sessionStorage.setItem('description',JSON.stringify(res.data.storefronts[0].description));
      sessionStorage.setItem('balance',JSON.stringify(res.data.storefronts[0].balance));
      
      this.state = {
        email: JSON.parse(sessionStorage.getItem('email')),
        name: JSON.parse(sessionStorage.getItem('name')),
        description: JSON.parse(sessionStorage.getItem('description')),
        balance: JSON.parse(sessionStorage.getItem('balance'))
      }
      console.log()
      this.setState({redirectToReferrer: true});
    }    
      }).catch(error => this.setState({error}))

    }

    }
    
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]:value});
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

   

  render() {

    var msg;
	  if (this.state.checked) {
	  msg = "Checked";
	  } else {
	  msg = "Un-checked";
	  }
    
    const isEnabled = this.state.email.length > 0 && this.state.password.length > 0;
     
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/home'}/>)
    }
   
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
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
  
     <div> <input name= "isStorefront" type="checkbox" checked={this.state.isStorefront} onChange={this.handleInputChange}/>Login as Storefront </div>
     <br></br>

      <div className="form-group text-center">
      <input type="submit" className="button success" value="Login" onClick={this.login} className="input" disabled={!isEnabled}/>
  
      </div>

      
      <div className="form-group text-center" style={{ color: 'red'}}>{message}</div>


      <p>Don't have an account?<a size="sm" variant="light" href="/register"> Click here to register</a> </p>

    <a size="sm" variant="light" href="/forgetpassword">Forgot password?</a> 
   
      </div>
     

  
    );
  }
} export default LoginPortal;



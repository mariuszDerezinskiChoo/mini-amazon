import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./LoginPortal.css";
import {Redirect} from 'react-router-dom';
import {PostData} from "./PostData";
import axios from "axios";
import "./LoginPortal.css";

class ForgetPassword extends Component {
     _isMounted = false;

  constructor(props){
    super(props);
   
    this.state = {
    email: '',
    security_question: '',
    security_answer:'',
    newPass:'',
    confirmNewPass:'',
    checkMessage: '',
    isStorefront: false,
    noData: null,
    user_answer: '',
    errors: [],
    diabled: false,
    }

    this.getSecurityQuestion = this.getSecurityQuestion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  editpwd() {
    if (this.state.isStorefront == false) {
    fetch('http://localhost:5000/buyerseditpassword', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => console.log('Success:', response))
      .catch(error => console.error('Error:', error));
  }
  else {
    fetch('http://localhost:5000/storefrontseditpassword', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => console.log('Success:', response))
      .catch(error => console.error('Error:', error));
  }
}

  handleCheck() {
      console.log(this.state.newPass);
      console.log(this.state.confirmNewPass);
    if(this.state.newPass == this.state.confirmNewPass) {
        this.editpwd();
        this.setState({checkMessage: "Your password has successfully been reset. Retun to Login and Sign in with your new Password"});
    } else {
        this.setState({checkMessage: "Passwords did not match"});
    }
}

  getSecurityQuestion() {
    //console.log("Login function");
    if(this.state.email){ // if smth is there for email
      if (this.state.isStorefront == false) {
      axios.post('http://localhost:5000/buyerssecurity', this.state)
      .then((res) => {
          console.log(res.data.buyer_security)
          console.log(res.status);
    if(res.data.buyer_security.length == 0 ){        // returns smth  
         //sessionStorage.setItem('userData',JSON.stringify(res));
         this.setState({noData: true}) ;
       }
    else {
    this.setState({noData: false})
    this.setState({security_question: JSON.stringify(res.data.buyer_security[0].security_question)});
    this.setState({ security_answer: JSON.stringify(res.data.buyer_security[0].security_answer)})
    }    
      }).catch(error => this.setState({error}))
    }

    else {
      axios.post('http://localhost:5000/storefrontssecurity', this.state)
      .then((res) => {
          console.log(res.data)
          console.log(res.status);
    if(res.data.storefront_security.length == 0 ){        // returns smth  
         //sessionStorage.setItem('userData',JSON.stringify(res));
         this.setState({noData: true}) ;
       }
    else {
    this.setState({noData: false})
    this.setState({security_question: JSON.stringify(res.data.storefront_security[0].security_question)});
    this.setState({ security_answer: JSON.stringify(res.data.storefront_security[0].security_answer)
    })
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

   handleSubmit = e => {
    const errors = [];
    e.preventDefault();
    console.log(JSON.parse(this.state.security_answer));
    if (this.state.disabled) {
        return;
    }
    this.setState({disabled: true});
    if (this.state.user_answer !== JSON.parse(this.state.security_answer)) {
        errors.push("Answer is incorrect. Please contact us to retrieve your account");
      }
      if (this.state.user_answer == JSON.parse(this.state.security_answer)) {
        errors.push("Correct");
      }
    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }
}

  render() {
    const isEnabled = this.state.email.length > 0;
    const { errors } = this.state;

    let content;
    let resetlink = '';

    console.log(this.state.newPass);
    if (this.state.noData == false) {
      content = <div><p> Security Question: {this.state.security_question} </p>

      <form onSubmit={this.handleSubmit}>
        {errors.map(error => (
          <p key={error}>{error}</p>
        ))}
        <input
          value={this.state.user_answer}
          onChange={evt => this.setState({ user_answer: evt.target.value })}
          type="text"
          placeholder="Your Answer"
        />
        <button type="submit" disabled={this.state.disabled}>Submit</button>
      </form>
      <div className="form-group text-center" style={{ color: 'red'}}>{resetlink}</div>
 </div>;
}
    if (this.state.noData == true){ content = <div><h2 style={{ fontsize: 40, color: 'blue'}}> No account found! </h2>
    </div>; }

if (this.state.errors[0] == 'Correct') {
    content = <div>

<div>
                New Password:<input type="password" name="newPass" placeholder="New Password" className="input" onChange={this.onChange} />
                <br />
                Confirm New Password:<input type="password" name="confirmNewPass" placeholder="Confirm New Password" className="input" onChange={this.onChange} />
                <br />
                <button onClick={this.handleCheck}>Update Pasword</button>
            </div>
            <div>{this.state.checkMessage}</div>

    </div>; 
}


 
     return (

      <div className="container">

    <Button href="../login" variant="outline-primary">Go back to Login</Button>
      <h1 style={{ color: '#007bff'}}></h1>
      <div className="form-group text-center">
      <label style={{ padding: 5}}>Enter your Email: </label>
      <input type="text" name="email" placeholder="Email" className="input" onChange={this.onChange} />
      </div>
     <div> <input name= "isStorefront" type="checkbox" checked={this.state.isStorefront} onChange={this.handleInputChange}/>This is a Storefront Account </div>
     <br></br>
      <div className="form-group text-center">
      <input type="submit" className="button success" value="Submit" onClick={this.getSecurityQuestion} className="input" disabled={!isEnabled}/>
      </div>


      <div className="form-group text-center" style={{ color: 'red'}}>{content}</div>
   
      </div>
  
    );
  }
} export default ForgetPassword;



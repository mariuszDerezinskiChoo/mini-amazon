import React, { Component, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./LoginPortal.css";
import backend from "../config"

class RegisterForm extends Component {
  _isMounted = false;

  constructor(props) {
  super(props);

  this.state = {
    first_name: "",
    last_name:"",
    email: "",
    password: "",
    security_question: 'What primary school did you attend?',
    security_answer:"",
    balance:"",
    errors: [],
    Message: " ",
    success: "",
    isStorefront: false,
    description: "",
    name: ""
  }
  this.onChange = this.onChange.bind(this);
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleChange = this.handleChange.bind(this);
}

handleChange(event) {
  this.setState({security_question: event.target.value});
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
  e.preventDefault();
    const errors = [];
    if (this.state.email.length < 5) {
      errors.push("Email should be at least 5 characters long");
    }
    if (this.state.email.split("").filter(x => x === "@").length !== 1) {
      errors.push("Email should contain a @");
    }
    if (this.state.email.indexOf(".") === -1) {
      errors.push("Email should contain at least one dot");
    }
    if (this.state.password.length < 8) {
      errors.push("Password should be at least 8 characters long");
    }
    if (this.state.balance < 0) {
      errors.push("Intial balance cannot be negative");
    }
    if (errors.length > 0) {
    this.setState({ errors: errors });
    return;
    }
    if (errors.length == 0) {
      
      if (this.state.isStorefront == false) {
        fetch(backend +'/add_buyer', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json)
          .then(response => this.setState({Message: "You have been registered!"}))
          .catch(error => {
            this.setState({Message: "Unsuccessful: email has already been used"});
          })
      }

   
      
      else {
        fetch(backend + 'add_storefront', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json)
        .then(response => this.setState({Message: "You have been registered! Please proceed to login page"}))
        .catch(error => {
          this.setState({Message: "Unsuccessful: email has already been used"});
        })
      }





    }

      
}


render() {

  const { errors } = this.state;
  
  let content = null;

  if (this.state.isStorefront == false) {
    const isEnabled = this.state.email.length > 0 && this.state.password.length > 0
    && this.state.first_name.length > 0 && this.state.last_name.length > 0 && 
    this.state.security_answer.length > 0 && this.state.balance.length > 0;
    ;
      content = <div id="formContent">
     
     <h2 >Account Sign Up</h2>
     <div id="form">
      <input 
      name= "isStorefront" 
      id="checkbox"
      type="checkbox" 
      checked={this.state.isStorefront} 
      onChange={this.handleInputChange}/>
      Register as Storefront
      { this.state.Message &&
        <h3 > {this.state.Message} </h3> }

      <input
              value={this.state.first_name}
              onChange={evt => this.setState({ first_name: evt.target.value })}
              type="text"
              placeholder="First Name"
            />
      
      <input
              value={this.state.last_name}
              onChange={evt => this.setState({ last_name: evt.target.value })}
              type="text"
              placeholder="Last Name"
            />
            <input
              value={this.state.email}
              onChange={evt => this.setState({ email: evt.target.value })}
              type="text"
              placeholder="Email"
            />
 
            <input
              value={this.state.password}
              onChange={evt => this.setState({ password: evt.target.value })}
              type="password"
              placeholder="Password"
            />
<label>Please select a security question:</label>
      <select security_question= {this.state.security_question} onChange={this.handleChange}>
                  <option value="what primary school did you attend?">What primary school did you attend?</option>
                  <option value="What was your childhood nickname?" >What was your childhood nickname?</option>
                  <option value="In what city or town was your first job?">In what city or town was your first job?</option>
                  <option value="what is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
      </select>
  
            <input
              value={this.state.security_answer}
              onChange={evt => this.setState({ security_answer: evt.target.value })}
              type="text"
              placeholder="Answer to Security Question"
            />

            <input
              value={this.state.balance}
              onChange={evt => this.setState({ balance: evt.target.value })}
              type="number"
              placeholder="Balance"
            />
      {errors.map(error => (
              <p key={error} style={{color: 'red'}}>Error: {error}</p>
            ))}
    
            <input type="submit" className="button success" value="Register" onClick={this.handleSubmit} className="input" disabled={!isEnabled}/> 
          </div>
          </div>;
    } else {

      const isEnabled = this.state.email.length > 0 && this.state.password.length > 0
  && this.state.name.length > 0 && this.state.description.length > 0 && 
  this.state.security_answer.length > 0 && this.state.balance.length > 0;
      content = <div id="formContent">
      <h2 >Account Sign Up</h2>
      <div id="form">
      <div id="checkbox">
      <input 
      name= "isStorefront" 
      id="checkbox"
      type="checkbox" 
      checked={this.state.isStorefront} 
      onChange={this.handleInputChange}/>
      <p> &nbsp;  Register as Storefront </p></div>
      <input
              value={this.state.name}
              onChange={evt => this.setState({ name: evt.target.value })}
              type="text"
              placeholder="Name"
            />
      <input
              value={this.state.description}
              onChange={evt => this.setState({ description: evt.target.value })}
              type="text"
              placeholder="Description"
            />

            <input
              value={this.state.email}
              onChange={evt => this.setState({ email: evt.target.value })}
              type="text"
              placeholder="Email"
            />

            <input
              value={this.state.password}
              onChange={evt => this.setState({ password: evt.target.value })}
              type="password"
              placeholder="Password"
            />
    <label>Please select a security question:</label>
      <select security_question= {this.state.security_question} onChange={this.handleChange}>
                  <option value="what primary school did you attend?">What primary school did you attend?</option>
                  <option value="What was your childhood nickname?" >What was your childhood nickname?</option>
                  <option value="In what city or town was your first job?">In what city or town was your first job?</option>
                  <option value="what is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
      </select>

            <input
              value={this.state.security_answer}
              onChange={evt => this.setState({ security_answer: evt.target.value })}
              type="text"
              placeholder="Answer to Security Question"
            />

            <input
              value={this.state.balance}
              onChange={evt => this.setState({ balance: evt.target.value })}
              type="number"
              placeholder="Balance"
            />
      {errors.map(error => (
              <p key={error} style={{color: 'red'}}>Error: {error}</p>
            ))}
  
            <input type="submit" className="button success" value="Register" onClick={this.handleSubmit} className="input" disabled={!isEnabled}/> 
      { this.state.Message &&
        <h3 id="error"> {this.state.Message} </h3> }
      </div> 
        </div>;
    }

  return (
    <div>
      <div className="wrapper">
      {content}
      <p id="registerlink">Already have an account?<a variant="light" href="/login"> &nbsp; Click here to login!</a> </p>
      </div>
  </div>
  );
};
}
export default RegisterForm 
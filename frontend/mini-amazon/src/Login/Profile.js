import React from "react";
import {Redirect} from 'react-router-dom';
import { useState, Component } from "react";
import NavBar from '../NavBar';
import "./Profile.css";
import backend from "../config"

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
        isStorefront: JSON.parse(sessionStorage.getItem('isStoreFront')),
        password: JSON.parse(sessionStorage.getItem('password')),
        newPass: '',
        confirmNewPass: '', 
        editing: false,
        checkMessage: '',
    }
    this.onChange = this.onChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
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


refreshPage() {
  window.location.reload(true);
}

editprofile() {
  if (this.state.first_name !== null) {
    fetch(backend + '/buyerseditprofile', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
    }
      )
    .then(response => this.setState({checkMessage: "Your profile has been updated!"})
    
    )
    .catch(error => {
      this.setState({checkMessage: "Unsuccessful"});
    })

    if (this.state.checkMessage !== "Unsuccessful") {
    sessionStorage.setItem('first_name',JSON.stringify(this.state.first_name));
    sessionStorage.setItem('last_name',JSON.stringify(this.state.last_name));
    window.location.reload(true);
  }
  }

  else {
    fetch(backend + '/storefrontseditprofile', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
    }
      )
    .then(response => this.setState({checkMessage: "Your profile has been updated!"})
    
    )
    .catch(error => {
      this.setState({checkMessage: "Unsuccessful"});
    })

    if (this.state.checkMessage !== "Unsuccessful") {
    sessionStorage.setItem('email',JSON.stringify(this.state.email));
    sessionStorage.setItem('name',JSON.stringify(this.state.name));
    sessionStorage.setItem('description',JSON.stringify(this.state.description));
    window.alert("success!");
    window.location.reload(true);
  }
  }
}

 handleCheck() {
  if (this.state.newPass.length < 8 )
  {this.setState({checkMessage: "Password must be at least 8 characters"});
 }
  else {
  

    if (this.state.first_name !== null && (this.state.first_name.length <1 || this.state.last_name.length < 1)) {
    this.setState({checkMessage: "Field(s) cannot be empty!"});
    }
    if (this.state.first_name == null && (this.state.name.length <1 || this.state.description.length < 1)) {
      this.setState({checkMessage: "Field(s) cannot be empty!"});
      }
      else {
    if(this.state.newPass == this.state.confirmNewPass) {
    this.editprofile();
    this.setState({checkMessage: "Your profile has been updated!"});
    }
    else {
    this.setState({checkMessage: "Passwords did not match."});
      };
    };
  };
};

  render() {
    let content = null;
    if (this.state.last_name != null) {
     
      content = <div className="wrapper">
<div id="content">
<div>
          <div className="heading"><p>Email<h4>(This field cannot be edited) </h4></p> </div>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={evt => this.setState({email: evt.target.value })}
            disabled ={true}/>
        </div>
        <div>
        <div className="heading"><p>Balance<h4> (To change balance, go to Add Balance Page) </h4></p> </div>
            <input
              type="number"
              name="balance"
              value={this.state.balance}
              onChange={evt => this.setState({balance: evt.target.value })}
            disabled ={true}/>
        </div>
      <form>
        <label>
          <div className="heading"><p>First Name</p></div>
          <input
            type="text"
            name="firstName"
            value={this.state.first_name}
            onChange={evt => this.setState({ first_name: evt.target.value })}
            disabled={!this.state.editing}
          />
        </label>
        <label>
          <div className="heading"><p>Last Name</p></div>
          <input
            type="text"
            name="lastName"
            value={this.state.last_name}
            onChange={evt => this.setState({last_name: evt.target.value })}
            disabled={!this.state.editing}
          />
        </label>

        <label>
          <div className="heading"><p>New Password</p></div>
          <input
            type="password"
            name="newPass"
            value={this.state.newPasspassword}
            onChange={evt => this.setState({newPass: evt.target.value })}
            disabled={!this.state.editing}
          />
        </label>
        <label>
          <div className="heading"><p>Confirm New Password</p></div>
          <input
            type="password"
            name="confirmNewPass"
            value={this.state.confirmNewPass}
            onChange={evt => this.setState({confirmNewPass: evt.target.value })}
            disabled={!this.state.editing}
          />
        </label>
      </form>
      <div>{this.state.checkMessage}</div>
      </div>
    </div>;
    } 
    else {
      content = 
        <div className="wrapper">
<div id="content">
<div>
          <div className="heading"><p>Email<h4>(This field cannot be edited) </h4></p> </div>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={evt => this.setState({email: evt.target.value })}
            disabled ={true}/>
        </div>
        <div>
        <div className="heading"><p>Balance<h4> (To change balance, go to Add Balance Page) </h4></p> </div>
            <input
              type="number"
              name="balance"
              value={this.state.balance}
              onChange={evt => this.setState({balance: evt.target.value })}
            disabled ={true}/>
        </div>
      <form>
        <label>
          <div className="heading"><p>Name</p></div>
          <input
            type="text"
            name="firstName"
            value={this.state.name}
            onChange={evt => this.setState({ name: evt.target.value })}
            disabled={!this.state.editing}
          />
        </label>
        <label>
          <div className="heading"><p>Description</p></div>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={evt => this.setState({description: evt.target.value })}
            disabled={!this.state.editing}
          />
        </label>

        <label>
          <div className="heading"><p>New Password</p></div>
          <input
            type="password"
            name="newPass"
            value={this.state.newPasspassword}
            onChange={evt => this.setState({newPass: evt.target.value })}
            disabled={!this.state.editing}
          />
        </label>
        <label>
          <div className="heading"><p>Confirm New Password</p></div>
          <input
            type="password"
            name="confirmNewPass"
            value={this.state.confirmNewPass}
            onChange={evt => this.setState({confirmNewPass: evt.target.value })}
            disabled={!this.state.editing}
          />
        </label>
      </form>
      <div>{this.state.checkMessage}</div>
      </div>
    </div>

      
      
      ;
    }

return (
    <div >
      <NavBar/>
      <h2>ACCOUNT DETAILS</h2>
      <button
              onClick={() => {
                this.setState({ editing: true });
              }}
            >
              Edit Profile
            </button>
      {content}
     
      <div className="wrapperfooter">
      <button id="submit" onClick={this.handleCheck} disabled={!this.state.editing}> Submit</button>
      <button id="cancel" onClick={this.refreshPage}  disabled={!this.state.editing}>Cancel</button>
      </div>
      </div>
  );
}
}

export default Profile;



import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./LoginPortal.css";

export default function LoginPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Register">
    <form onSubmit={handleSubmit}>
      <FormGroup controlId="email" bssize="large">
        <FormLabel>Email</FormLabel>
        <FormControl
          autoFocus
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup controlId="password" bssize="large">
        <FormLabel>Password</FormLabel>
        <FormControl
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </FormGroup>
        <Button block disabled={!validateForm()} type="submit" href="/home">
          Login
        </Button>

      <p>Don't have an account?</p>
    <Button size="sm" variant="light" href="/register">Register</Button>  
      </form> 
    </div>

  );
}

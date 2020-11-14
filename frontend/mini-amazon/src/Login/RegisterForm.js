import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./LoginPortal.css";

export const BuyerForm = ({onNewBuyer}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [balance, setBalance] = useState(0);

  return (
    <div className="container">
      <h1 style={{ color: '#007bff'}}>SIGN UP</h1>
      <ul>
        <input
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </ul>
      <ul>
        <input
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        required
        />
      </ul>
      <ul>
        <input
          placeholder="First Name"
          value={first_name}
          onChange={e => setFirstName(e.target.value)}
        required
        />
      </ul>
      <ul>
        <input
          placeholder="Last Name"
          value={last_name}
          onChange={e => setLastName(e.target.value)}
        required
        />
      </ul>
      <ul>
        <input
          placeholder="balance"
          value={balance}
          onChange={e => setBalance(e.target.value)}
        />
      </ul>

      <label>
      <div className="form-group text-center">
        <input 
        type="submit" className="button success" value="Submit"
          onClick={async () => {
            const buyer = { email, password, first_name, last_name, balance };
            const response = await fetch("/add_buyer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(buyer)
            });

            if (response.ok) {
              console.log("response worked!");
              //onNewBuyer(buyer);
              setEmail("");
              setPassword("");
              setFirstName("");
              setLastName("");
              setBalance(0);
            }
          }}
          />
        </div>

        <p>Already have an account?<a size="sm" variant="light" href="/login"> Click here to login</a> </p>
      </label>
    </div>
  );
};

export default BuyerForm
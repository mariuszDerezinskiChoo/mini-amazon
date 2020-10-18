import React, { useState } from "react";

export const UserForm = ({onNewUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [balance, setBalance] = useState(0);

  return (
    <form>
      <label>
        <input
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label>
        <input
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <label>
        <input
          placeholder="First Name"
          value={first_name}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        <input
          placeholder="Last Name"
          value={last_name}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <label>
        <input
          placeholder="balance"
          value={balance}
          onChange={e => setBalance(e.target.value)}
        />
      </label>

      <label>
        <button
          onClick={async () => {
            const user = { email, password, first_name, last_name, balance };
            const response = await fetch("/add_buyer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(user)
            });

            if (response.ok) {
              console.log("response worked!");
              onNewUser(user);
              setEmail("");
              setPassword("");
              setFirstName("");
              setLastName("");
              setBalance(0);
            }
          }}
        >
          submit
        </button>
      </label>
    </form>
  );
};
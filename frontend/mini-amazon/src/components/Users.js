import React from "react";

export const Users = ({ users }) => {
  return (
      <li>
        {users.map(user => {
        return (
            <ul key={user.email}>
          <p>{user.email}</p>
          <p>{user.password}</p>
          <p>{user.first_name}</p>
          <p>{user.last_name}</p>
          <p>{user.balance}</p>
          <br></br>
          </ul>
        );
      })}
   </li>
  )
};
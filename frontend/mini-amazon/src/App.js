import React, {Component, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Users} from "./components/Users";
import {UserForm} from "./components/UserForm";

function App() {
   const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users').then(response =>
      response.json().then(data => {
        setUsers(data.users);
      })
    );
  }, []);

  return <div className="App">
    <UserForm onNewUser={user =>
          setUsers(currentUsers => [user, ...currentUsers])}/>
    <Users users={users} />
  </div>;
}
export default App;
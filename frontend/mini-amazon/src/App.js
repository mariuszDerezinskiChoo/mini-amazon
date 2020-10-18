import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {Users} from "./components/Users";
import {UserForm} from "./components/UserForm";

function App() {
   const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/buyers').then(response =>
      response.json().then(data => {
        setUsers(data.users);
      })
    );
  }, []);
}

export default App;
import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {Listings} from "./components/Listings";
import {UserForm} from "./components/UserForm";

function App() {
  const [listings, setListings] = useState([]);
  
  useEffect( () => {
    fetch('/listings').then(response =>
      response.json().then(data => {
        setListings(data.listings);
      })
    );
  }, []);

  return (
    <div className= "App" >
      <Listings listings= {listings} />
    </div>
  );
}

export default App;